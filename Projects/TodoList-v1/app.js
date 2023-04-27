const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let day = "";
let todoItems = [];
let workItems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  day = today.toLocaleDateString("en-US", options);

  res.render("list.ejs", { title: day, addedToDos: todoItems });
});

app.get("/work", function (req, res) {
  res.render("list.ejs", { title: "Work", addedToDos: workItems });
});

app.post("/work", function (req, res) {
  const newWorkItem = req.body.newItem;
  workItems.push(newWorkItem);
  res.redirect("/work");
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});

app.post("/", (req, res) => {
  todoItems.push(req.body.newItem);
  res.redirect("/");
});
