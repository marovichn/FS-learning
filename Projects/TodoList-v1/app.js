const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
  value: "Wake Up"
})
const todo2 = new Todo({
  value: "Wake Up"
})
const todo3 = new Todo({
  value: "Wake Up"
})
const defaultTodos = [todo1,todo2, todo3];


app.get("/", function (req, res) {
const read = async() =>{
  const allTodos = await Todo.find();
  if (allTodos.length === 0) {
    await Todo.insertMany(defaultTodos);
  }
  const dbTodos =[];
  allTodos.forEach(todo=>dbTodos.push(todo.value));
  res.render("list.ejs", { title: "Today", addedToDos: dbTodos, type: "date" });
}
read().catch(err=>console.log(err));
});

app.post("/", (req, res) => {
  let item = req.body.newItem;
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
    await newItem.save();
    res.redirect("/");
  }
};
add().catch(err=>console.log(err));
  
});

app.get("/work", function (req, res) {
  res.render("list.ejs", {
    title: "Work",
    addedToDos: workItems,
    type: "work"
  });
});

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


app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
