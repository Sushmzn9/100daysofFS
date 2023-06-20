const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/v1");
  console.log("db connected");
}

const userSchema = new mongoose.Schema({
  username: String, // Corrected the property name from "userName" to "username"
  password: String,
});

const User = mongoose.model("UserData", userSchema);

app.use(cors());
app.use(bodyParser.json());

app.post("/v1", async (req, res) => {
  const { username, password } = req.body;
  let user = new User();
  user.username = username; // Corrected from "res.body.username" to "req.body.username"
  user.password = password; // Corrected from "res.body.password" to "req.body.password"

  try {
    const doc = await user.save();
    console.log(doc);
    res.json(doc);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

// curd

app.get("/v1", async (req, res) => {
  const docs = await User.find({});
  //   res.send("hello");
  res.json(docs);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
