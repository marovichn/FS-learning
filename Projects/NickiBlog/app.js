//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/BlogDB")
  .catch((err) => console.log(err));
const postSchema = new mongoose.mongoose.Schema({
  title: String,
  post: String,
});

const Post = new mongoose.model("Post", postSchema);

const defaultsSchema = new mongoose.Schema({
  aboutContent: String,
  homeStartingContent: String,
  contactContent: String,
});

const Default = new mongoose.model("Default", defaultsSchema);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const run = async () => {
    const posts = await Post.find();
    const defaults = await Default.find();
    if (posts && posts.length !== 0) {
      res.render("home", {
        startingContent: defaults[0].homeStartingContent,
        postsList: posts,
      });
    } else {
      res.render("home", {
        startingContent: defaults[0].homeStartingContent,
        postsList: [],
      });
    }
  };
  run().catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  const run = async () => {
    const defaults = await Default.find();
    res.render("about", {
      startingContent: defaults[0].aboutContent,
    });
  };
  run().catch((err) => {
    res.redirect("/error");
    console.log(err);
  });
});

app.get("/contact", (req, res) => {
  const run = async () => {
    const defaults = await Default.find();
    res.render("contact", {
      startingContent: defaults[0].contactContent,
    });
  };
  run().catch((err) => {
    res.redirect("/error");
    console.log(err);
  });
});

app.get("/error", (req, res) => {
  res.render("error.ejs");
});
app.post("/error", (req, res) => {
  res.redirect("/compose");
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs", {
    title: "Compose",
  });
});

app.post("/compose", (req, res) => {
  if (!req.body.composedTitle || req.body.composedTitle.trim().length === 0) {
    res.redirect("/error");
  } else if (
    !req.body.composedPost ||
    req.body.composedPost.trim().length === 0
  ) {
    res.redirect("/error");
  } else {
    const composedText = {
      title: req.body.composedTitle,
      post: req.body.composedPost,
    };
    const run = async () => {
      await Post.insertMany([composedText]);
      res.redirect("/");
    };
    run().catch((err) => console.log(err));
  }
});

app.get("/posts/:postId", (req, res) => {
  const reqTitle = _.lowerCase(req.params.postId);
  const run = async () => {
    const posts = await Post.find();

    posts.forEach((p) => {
      const storedTitle = _.lowerCase(p.title);

      if (storedTitle === reqTitle) {
        res.render("post.ejs", {
          title: p.title,
          post: p.post,
        });
      }
    });
  };
  run().catch((err) => console.log(err));
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
