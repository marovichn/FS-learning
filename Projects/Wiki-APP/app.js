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

app
  .route("/articles")
  .get((req, res) => {
    try {
      const run = async () => {
        const articles = await Article.find();
        res.send(articles);
      };
      run().catch((err) => res.send(err));
    } catch (err) {
      res.send(err);
    }
  })
  .post((req, res) => {
    try {
      const run = async () => {
        const newArticle = new Article({
          title: req.body.title,
          content: req.body.content,
        });
        await newArticle.save();
        res.send("Success");
      };
      run().catch((err) => res.send(err));
    } catch (err) {
      res.send(err);
    }
  })
  .delete((req, res) => {
    try {
      const run = async () => {
        await Article.deleteMany();
        res.send("Success");
      };
      run().catch((err) => res.send(err));
    } catch (err) {
      res.send(err);
    }
  });

app
  .route("/articles/:articleName")
  .get((req, res) => {
    try {
      const articleName = req.params.articleName;
      const run = async () => {
        const article = await Article.findOne({ title: articleName });
        res.send(article);
      };
      run().catch((err) => res.send(err));
    } catch (err) {
      res.send(err);
    }
  })
  .put((req, res) => {
    try {
      const run = async () => {
        await Article.findOneAndUpdate(
          { title: req.params.articleName },
          {
            title: req.body.title,
            content: req.body.content,
          },
          {
            overwrite: true,
          }
        );
        res.send("Success!");
      };
      run().catch((err) => res.send(err));
    } catch (err) {
      res.send(err);
    }
  })
  .patch((req, res) => {
    try {
      const run = async () => {
        await Article.findOneAndUpdate(
          { title: req.params.articleName },
          {
            $set: req.body,
          }
        );
        res.send("Success!");
      };
      run().catch((err) => res.send(err));
    } catch (err) {
      res.send(err);
    }
  }).delete((req,res)=>{
    try {
      const run = async () => {
        await Article.deleteOne(
          { title: req.params.articleName }
        );
        res.send("Success!");
      };
      run().catch((err) => res.send(err));
    } catch (err) {
      res.send(err);
    }
  });

app.listen("3000", () => {
  console.log("Listening on 3000");
});
