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

    const peopleSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        min: 18,
        max: 65,
      },
      favoriteFruit: fruitSchema,
    })

    const People = mongoose.model("People", peopleSchema);
    
    const Pineapple = new Fruit({
      name: "Pineapple",
      rating: 9,
      review: "Fenomenallll"
    });
    
    const apple = new Fruit({
      name: "apple",
      rating: 9,
      review: "Fenomenallll"
    });

    const person1 = new People({
      name: "Joe",
      age: 18,
      favoriteFruit: Pineapple,
    })

    await People.updateOne({ _id: "645ea43ce22548c03c7e8053" },{favoriteFruit: apple});

    await People.deleteOne({ _id: "645ea43ce22548c03c7e8052" });

    console.log(await People.find());



    /* Pineapple.save();
    person1.save(); */

   /* await People.insertMany([people1, people2]); */
/* 
   await People.deleteOne({ _id: "645d7432a756b819e21e13df" });

   await People.updateOne({ _id: "645ea43ce22548c03c7e8052" }, { age: 19 }); */



  /*  console.log(await People.find()); */

   
  } catch (err) {
    console.log(err);
  }
}
run().catch(console.dir);
