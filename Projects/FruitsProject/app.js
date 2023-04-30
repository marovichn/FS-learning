const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const app = express();

app.get("/",()=>{});

app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})