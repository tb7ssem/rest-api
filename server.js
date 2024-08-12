const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./models/user");
require("dotenv").config();

const URI = process.env.URI;

app.use(express.json());
mongoose
  .connect(URI)
  .then(() => console.log("connect to database"))
  .catch((err) => console.log(err));

app.post("/api/create", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newuser = new user({
      username,
      email,
      password,
    });
    await newuser.save();
    res.status(200).json({ ok: true, message: "User was created" });
  } catch (err) {
    if (err) throw err;
    res.status(400).json({ status: false, error });
  }
});

//get users
app.get("/api/users", async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json({ status: true, data: users });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
});
//update users
app.put("/api/update/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await user.findByIdAndUpdate(id, {
      Set: { ...req.body },
    });
    res.status(200).json({ status: true, message: "User was update" });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
});

// delete user
app.delete("/api/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await user.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "User was deleted" });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ status: false, error });
  }
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Server is up and running");
});
