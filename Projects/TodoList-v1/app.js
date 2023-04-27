const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let todoItem = [];
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

  res.render("list.ejs", { kindOfDay: day, addedToDos: todoItem });
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});

app.post("/", (req, res) => {
  todoItem.push(req.body.newItem);
  res.redirect("/");
});
