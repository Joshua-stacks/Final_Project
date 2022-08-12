const express = require("express");
const morgan = require("morgan");

const {
  getUsers,
  signUp,
  deleteUser,
  updatePass,
  logIn,
  authenticateToken,
  getLogedUser,
  updateUser,
} = require("./HandlersForLogs");
const { getCities, getFacts } = require("./HandlersTime");
const { getWatches, getWatch } = require("./webScrappingWatches");

const PORT = 8000;

const app = express();
app.use(morgan("tiny"));

app.use(express.json());

// Requests for static files will look in public.
app.use(express.static("public"));

// Endpoints for login
app.get("/users", getUsers);
app.post("/signup", signUp);
app.delete("/profile", deleteUser);
app.patch("/profile", updatePass);
app.post("/login", logIn);
app.get("/user", authenticateToken, getLogedUser);
app.patch("/update", updateUser);

//timezone and facts
app.get("/cities", getCities);
app.get("/facts", getFacts);

//get watches
app.get("/watch/:_id", getWatch);
app.get("/watches", getWatches);

app.get("*", (req, res) => {
  return res.status(404).json({ status: 404, message: "No endpoint found." });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
