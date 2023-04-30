const express = require("express");
const app = express();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "fruitsDB";

const client = new MongoClient(url);

client.connect((err) => {
  assert.equal(null, err);
  console.log("Connected succesfully");

  const db = client.db(dbName);

  client.close();
});

app.get("/", () => {
  
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
