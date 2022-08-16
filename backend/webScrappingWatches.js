const puppeteer = require("puppeteer");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const scrapeProduct = async (url, xpath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [price] = await page.$x(xpath);
  const text = await price.getProperty("textContent");
  const priceText = await text.jsonValue();
  browser.close();
  return priceText;
};

const getWatches = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    const watches = await db.collection("watches").find().toArray();

    res
      .status(200)
      .json({ status: 200, product: watches, message: "All watches" });
  } catch {
    res.status(404).json({ status: 400, message: "No Watches" });
  }
  client.close();
  console.log("disconnected!");
};

const getWatch = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const prod = req.params._id;
  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    const watch = await db
      .collection("watches")
      .findOne({ _id: ObjectId(prod) });
    const price = await scrapeProduct(watch.Url, watch.pricXpath);
    res.status(200).json({ status: 200, watch: watch, price: price });
  } catch {}
  client.close();
  console.log("disconnected!");
};

const addFav = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const prod = req.params.username;
  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    await db
      .collection("users")
      .updateOne({ username: prod }, { $set: { ...req.body } });
    res.status(200).json({ status: 200, message: "updated" });
  } catch {
    res.status(404).json({ status: 400, message: "No Watches" });
  }
  client.close();
  console.log("disconnected!");
};

const removeFav = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const prod = req.params.username;
  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    await db
      .collection("users")
      .updateOne({ username: prod }, { $pull: { fav: req.body.fav } });
    res.status(200).json({ status: 200, message: "deleted" });
  } catch {
    res.status(404).json({ status: 400, message: "No Watches" });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = { getWatches, getWatch, addFav, removeFav };
