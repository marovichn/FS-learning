const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/";

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    console.log("Connected Successfully to server");

    const db = client.db("fruitsDB");

    await db.collection("fruits").insertMany(
      [
        { _id: 2, name: "Orange", qty: 20, score: 8, review: "Great!!" },
        { _id: 3, name: "Banana", qty: 30, score: 8, review: "Great!!" },
        { _id: 4, name: "Apple", qty: 15, score: 8, review: "Great!!" },
      ],
      function (error, doc) {
        if (error) {
          console.log(error);
        } else {
          console.log("success");
        }
        db.close();
      }
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
