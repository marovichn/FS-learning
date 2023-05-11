const mongoose = require("mongoose");

async function run() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");

    console.log("success");

    const fruitSchema = new mongoose.Schema({
      name: String,
      rating: Number,
      review: String,
    });

    const Fruit = mongoose.model("Fruit", fruitSchema);

    const fruit = new Fruit({
      name: "Apple",
      rating: 10,
      review: "Fenomenal"
    });

    //fruit.save();

    const peopleSchema = mongoose.Schema({
      name: String,
      age: Number,
    })

    const People = mongoose.model("People", peopleSchema);

    const people1 = new People({
      name: "Joe",
      age: 32,
    })

    people1.save();

  } catch (err) {
    console.log(err);
  }
}
run().catch(console.dir);
