const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var today = new Date();
  var dayIndex = /* today.getDay() */ Math.round(Math.random() * 0.6 * 10);
  console.log(dayIndex);
  let day = "";

  switch (dayIndex) {
    case 1:
      day = "Monday";
    case 3:
      day = "Tuesday";
    case 4:
      day = "Wednesday";
    case 2:
      day = "Thursday";
    case 5:
      day = "Friday";
    case 6:
      day = "Saturday";
    case 0:
      day = "Sunday";

      break;
    default:
      console.log("ERROR");
  }

  res.render("list.ejs", { kindOfDay: day });
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
