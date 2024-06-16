const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
      return res.status(404).send({ message: "Already Email Registered" });
    }

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});


router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if(!users) return res.status(404).send({ message: "User not found"})
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send({ message: "not found user details"})
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});



module.exports = router;
