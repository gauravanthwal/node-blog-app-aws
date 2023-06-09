const { Router } = require("express");
const { Blog } = require("../models/blogSchema");
const { Comment } = require("../models/commenSchema");
const { validateToken } = require("../services/authentication");
const { validateUser } = require("../middlewares/validateUser");
const multer = require("multer");
const path = require("path");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.get("/getAll", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ success: true, blogs });
  } catch (err) {
    console.log("error", err.message);
    res.status(400).json({ error: true, message: err.message });
  }
});

router.get("/add-new", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

router.post("/add-new", validateUser, async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res
        .status(400)
        .json({ error: true, message: "All the fields are required" });
    }
    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageURL: "",
    });

    return res.status(201).json({ error: false, success: true, blog });
  } catch (err) {
    console.log(err.message);
    return res
      .status(400)
      .json({ error: true, message: "Blod doesn't created" });
  }
});

router.get("/myBlogs", async (req, res) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const user = validateToken(token);
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "UnAuthenticated User" });
    }
    const myBlogs = await Blog.find({ createdBy: user._id });
    return res.status(200).json({ error: false, success: true, myBlogs });
  } catch (err) {
    console.log("error: ", err.message);
    res.status(400).json({ error: true, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );

    return res
      .status(200)
      .json({ error: false, success: true, blog, comments });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: true, message: err.message });
  }
});

router.post("/comment/:blogId", async (req, res) => {
  try {
    const comment = await Comment.create({
      createdBy: req.user._id,
      content: req.body.comment,
      blogId: req.params.blogId,
    });

    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (err) {
    console.log(err);
  }
});
router.get("/remove", async (req, res) => {
  const blog = await Blog.deleteMany({});
  return res.json({ blog });
});

module.exports = router;
