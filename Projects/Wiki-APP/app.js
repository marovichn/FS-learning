const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const app = express();
const mongoCred = require("./private");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://" +
      mongoCred.DB_USERNAME +
      ":" +
      mongoCred.DB_PASSWORD +
      "@nikola.wojtt5i.mongodb.net/WikiDB"
  )
  .catch((err) => console.log(err));

const articlesSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = new mongoose.model("Article", articlesSchema);

app.get("/articles", (req, res) => {
  try {
    const run = async () => {
      const articles = await Article.find();
      res.send(articles);
    };
    run().catch((err) => res.send(err));
  } catch (err) {
    res.send(err);
  }
});

app.post("/articles", (req, res) => {
 
  try {
    const run = async () => {
       const newArticle = new Article({
         title: req.body.title,
         content: req.body.content,
       });
       const res = await newArticle.save();
       res.send(res);
    };
    run().catch((err) => res.send(err));
  } catch (err) {
    res.send(err);
  }

});

app.listen("3000", () => {
  console.log("Listening on 3000");
});
