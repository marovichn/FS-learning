const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
let day = "";
let todoItems = [];
let workItems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  const day = date();

  res.render("list.ejs", { title: day, addedToDos: todoItems });
});

app.post("/", (req, res) => {
  let item = req.body.newItem;
  if (item.trim().length === 0 && req.body.list === "Work") {
    res.redirect("/work");
  } else if (item.trim().length === 0 && req.body.list !== "Work"){
    res.redirect("/");
  }else {
    if (req.body.list === "Work") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      todoItems.push(item);
      res.redirect("/");
    }
  }
});

app.get("/work", function (req, res) {
  res.render("list.ejs", {
    title: "Work",
    addedToDos: workItems,
  });
});

app.post("/work", function (req, res) {
  const newWorkItem = req.body.newItem;
  workItems.push(newWorkItem);
  res.redirect("/work");
});

app.get("/about", (req,res)=>{
  res.render("about.ejs", {
    title: "About",
  })
})

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
