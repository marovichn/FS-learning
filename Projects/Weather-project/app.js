const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const q = req.body.country;
  const unit = "metric";
  const apiKey = "a77ade5636b3ba5489ea2a2a2a61db1e";

  https.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}&units=${unit}`,
    (resp) => {
      resp.on("data", (d) => {
        const data = JSON.parse(d);
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        res.write(
          `<h1>Current temperature in ${q} is: ${temp} degrees Celsious, the weather is currently: ${description}</h1>`
        );
        res.write(`<img src="${iconUrl}" />`);
        res.send();
      });
    }
  );
});

app.listen(1234, function () {
  console.log("I'm running on port localhost:1234");
});
