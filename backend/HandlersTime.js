const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCities = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    const result = await db.collection("timezone").find().toArray();
    res
      .status(200)
      .json({ status: 200, cities: result, message: "All cities" });
  } catch {
    res.status(404).json({ status: 400, message: "No cities found" });
  }
  client.close();
  console.log("disconnected!");
};

const getFacts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    const result = await db.collection("facts").find().toArray();
    const rand = Math.floor(Math.random() * result.length);
    const ran = result[rand];
    const sec = () => {
      const random = Math.floor(Math.random() * result.length);
      const second = result[random];
      if (random === rand) {
        return sec();
      } else {
        return second;
      }
    };
    const num = sec();
    const three = () => {
      const rando = Math.floor(Math.random() * result.length);
      const tree = result[rando];
      if (rando === rand||num===tree) {
        return three();
      } else {
        return tree;
      }
    };
    const third = three();
    if(third===num){
      console.log("match")
    }

    res.status(200).json({
      status: 200,
      facts: ran,
      two: num,
      three: third,
      message: "All facts",
    });
  } catch {
    res.status(404).json({ status: 400, message: "No cities found" });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = { getCities, getFacts };
