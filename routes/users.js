const { Router } = require("express");
const { User } = require("../models/userSchema");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    await User.create({
      fullName,
      email,
      password,
    });

    return res.redirect("/");
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.matchPassword(email, password);
    console.log("user", user);

    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log("error: ", err);
  }
});

module.exports = router;
