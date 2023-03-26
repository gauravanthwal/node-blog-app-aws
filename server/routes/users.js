const { Router } = require("express");
const { User } = require("../models/userSchema");
const { validateToken } = require("../services/authentication");

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
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All Fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: true,
        message: "User already exist, please try sign in",
      });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
    });
    return res.status(201).json({
      success: true,
      error: false,
      message: "User Created",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: true, message: err.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Input field missing" });
    }
    const token = await User.matchPasswordAndGenerateToken(email, password);

    const user = { email, token };
    res
      .cookie("token", token)
      .status(200)
      .json({ error: false, success: true, user });
  } catch (err) {
    console.log("error : ", err.message);
    res.status(400).json({ error: true, success: false, message: err.message });
    // res.render("signin", { error: "Incorrect email or password" });
  }
});

router.get("/getUserDetails", async (req, res) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const user = validateToken(token);
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "UnAuthenticated User" });
    }
    const userDetails = await User.findOne({ _id: user._id });
    const { password, salt, ...others } = userDetails._doc;

    return res
      .status(200)
      .json({ error: false, success: true, userDetails: others });
  } catch (err) {
    console.log("error : ", err.message);
    res.status(401).json({ error: true, message: err.message });
  }
});

router.put("/updateUserProfile", async (req, res) => {
  try {
    const { fullName, email, profileImageURL } = req.body;
    const token = req.headers.authorization.split("Bearer ")[1];
    const user = validateToken(token);

    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Un Authenticated User" });
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      email,
      fullName,
      profileImageURL,
    });
    return res
      .status(200)
      .json({ error: false, success: true, message: "Profile updated" });
  } catch (err) {
    console.log("error : ", err.message);
    res.status(400).json({ error: true, message: err.message });
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
router.get("/remove", async (req, res) => {
  try {
    const users = await User.deleteMany();
    return res.status(200).json(users);
  } catch (err) {
    console.log("error: ", err);
  }
});

module.exports = router;
