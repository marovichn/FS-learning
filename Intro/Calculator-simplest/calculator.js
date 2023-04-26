const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  const results = {
    plus: num1 + num2,
    minus: num1 - num2,
    mult: num1 * num2,
    div: num1 / num2,
  };

  res.send(
    `<h1>Your results are:</h1>
    </br>
    <ol>
      <li>Addition: ${results.plus}</li>
      <li>Subtraction: ${results.minus}</li>
      <li>Multiplication: ${results.mult}</li>
      <li>Division: ${results.div}</li>
    </ol>`
  );
});

app.get("/bmiCalc", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalc", function (req, res) {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  const result = weight / (height * height);

  res.send(`<h1>Your BMI is : ${result}</h1>`);
});

app.listen(3000, function () {
  console.log("server is running on localhost:3000");
});
