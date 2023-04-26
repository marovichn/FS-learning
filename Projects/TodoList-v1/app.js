const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function (req, res) {
  var today = new Date();
  var day = today.getDay();
  if (day === 6 || day === 0) {
    res.send("Yay its weekend!!");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
