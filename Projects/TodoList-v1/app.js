const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/TodoDB").catch(err=>console.log(err));

const TodoSchema = new mongoose.Schema({
  value: {
    type:String,
    required: true,
  }
})

const Todo = new mongoose.model("Todo", TodoSchema);

const todo1 = new Todo({
  value: "Welcome"
})
const todo2 = new Todo({
  value: "Click + to add todos"
})
const todo3 = new Todo({
  value: "<-- click here to delete!"
})
const defaultTodos = [todo1,todo2, todo3];

const listSchema =  new mongoose.Schema({
name:String,
items: [TodoSchema]
})

const List = new mongoose.model("List", listSchema);

app.get("/", function (req, res) {
const read = async() =>{
  const allTodos = await Todo.find();
  const todos = [...allTodos];
  if (allTodos.length === 0) {
    await Todo.insertMany(defaultTodos);
  }
  res.render("list.ejs", { title: "Today", addedToDos: todos, type: "date" });
}
read().catch(err=>console.log(err));
});

app.post("/", (req, res) => {
  let item = req.body.newItem;
  const listName = req.body.list;
  const add =async()=>{
  if (item.trim().length === 0 && req.body.list === "Work")
  {
    res.redirect("/work");
  }
  else if (item.trim().length === 0 && req.body.list !== "Work")
  {
    res.redirect("/");
  } else
  {
    const newItem = new Todo({value: item});
    if(listName === "Today"){
      await newItem.save();
    res.redirect("/");
    }else{
      const customList =await List.findOne({name: listName});
      customList.items.push(newItem);
      customList.save();
      res.redirect("/" + listName);
    }
  }
};
add().catch(err=>console.log(err));
  
});

app.get("/:listType",(req,res)=>{
const listType = _.capitalize(req.params.listType);

const run =async()=>{
const storedList = await List.findOne({name:listType});
if(!storedList){
  const list = new List({
  name: listType,
  items:defaultTodos,
});

await list.save();
res.redirect("/" + listType);
}else{
res.render("list.ejs", {
  title: listType,
  addedToDos: storedList.items,
  type: listType,
});
}

};
run().catch(err=>console.log(err));
})

app.post("/work", function (req, res) {
  const newWorkItem = req.body.newItem;
  workItems.push(newWorkItem);
  res.redirect("/work");
});

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    title: "About",
  });
});

app.post("/delete",(req,res)=>{
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  
  const del =async()=>{
    if(listName==="Today"){
      await Todo.deleteMany({_id: checkedItemId});
  res.redirect("/");
    }else{
      await List.findOneAndUpdate({name:listName},{$pull:{
        items:{_id: checkedItemId}
      }});
      res.redirect("/" + listName);
    }
  };
  del().catch(err=>console.log(err))
  
});


app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
