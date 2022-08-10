const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const authenticateToken = (req,res,next) =>{
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    const result = await db.collection("users").find().toArray();
    res.status(200).json({ status: 200, users: result, message: "All users" });
  } catch {
    res.status(404).json({ status: 400, message: "No users found" });
  }
  client.close();
  console.log("disconnected!");
};

const signUp = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    const exist = await db
      .collection("users")
      .findOne({ username: req.body.username });
    if (exist) {
      return res
        .status(409)
        .json({ status: 409, message: "Username already exist" });
    }
    const hashed = await bcrypt.hash(req.body.ConPass, 10);
    await db.collection("users").insertOne({
      username: req.body.username,
      name: req.body.name,
      last: req.body.last,
      password: hashed,
      avatarUrl: req.body.avatarUrl
    });
    res.status(200).json({ status: 200, message: "User Created" });
  } catch {
    res.status(404).json({ status: 400, message: "user not created" });
  }
  client.close();
  console.log("disconnected!");
};

const deleteUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    const del = await db
      .collection("users")
      .deleteOne({ username: req.body.delete });
    del.deletedCount === 1
      ? res.status(200).json({ status: 200, meesage: "User has been deleted" })
      : res.status(400).json({ status: 400, message: "Delete was not done" });
  } catch {
    res.status(404).json({ status: 400, message: "Something went wrong" });
  }
  client.close();
  console.log("disconnected!");
};

const updatePass = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    const newHashed = await bcrypt.hash(req.body.newPass, 10);
    const updatePass = await db
      .collection("users")
      .updateOne(
        { username: req.body.username },
        { $set: { password: newHashed } }
      );
    updatePass.modifiedCount === 1
      ? res.status(200).json({ status: 200, message: "Password was changed" })
      : res
          .status(400)
          .json({ status: 400, message: "Password wasnt changed" });
  } catch {
    res
      .status(404)
      .json({
        status: 400,
        message: "Something went wrong while updating password",
      });
  }
  client.close();
  console.log("disconnected!");
};

const updateUser = async (req,res) => {
  const client = new MongoClient(MONGO_URI, options);
  try{
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    const update = await db
      .collection("users")
      .updateOne(
        { username: req.body.username },
        { $set: { ...req.body } }
      );
      update.modifiedCount === 1
      ? res.status(200).json({ status: 200, message: "Info Changed" })
      : res
          .status(400)
          .json({ status: 400, message: "Error on change" });

  }catch{
    res
      .status(404)
      .json({
        status: 400,
        message: "Something went wrong while updating user",
      });
  }
  client.close();
  console.log("disconnected!");
}



const logIn = async(req,res) => {
  const client = new MongoClient(MONGO_URI, options);
  try{
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    const users = db.collection("users");
    const user = await users.findOne({username:req.body.username})
    if (user === null){
      return res.status(400).json({status:400,message:"User not found"})
    }
    if(await bcrypt.compare(req.body.password,user.password)){
      const username = req.body.username
      const user = {name:username}
      const accessToken = generateAccessToken(user)
      // await db.collection("tokens").insertOne({token:accessToken})
      return res.status(200).json({message:"Success" , token: accessToken})

    }else{
      return res.status(400).json({status:400,message:"Wrong Password"})
    }
  }catch{

  }
  client.close();
  console.log("disconnected!");
}

const getLogedUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("db-name");
    const result = await db.collection("users").find().toArray();
    const info = result.filter(user => user.username === req.user.name)
    res.status(200).json({ status: 200, user: info, message: "Loged user" });
  } catch {
    res.status(404).json({ status: 400, message: "No user found" });
  }
  client.close();
  console.log("disconnected!");
};



module.exports = {
  getUsers,
  signUp,
  deleteUser,
  updatePass,
  logIn,
  authenticateToken,
  getLogedUser,
  updateUser
};
