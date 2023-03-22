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

    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log("user", token);

    res.cookie("token", token).redirect("/");
  } catch (err) {
    console.log("error : ", err.message);
    res.render("signin", { error: "Incorrect email or password" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
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
