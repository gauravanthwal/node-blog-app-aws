const { Router } = require("express");
const { Blog } = require("../models/blogSchema");
const { Comment } = require("../models/commenSchema");
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

router.get("/add-new", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

router.post("/add-new", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, body } = req.body;

    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`,
    });

    return res.redirect(`/blog/${blog._id}`);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );

    return res.render("blog", { user: req.user, blog, comments });
  } catch (err) {
    console.log(err);
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

router.get("/all", async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json(blogs);
  } catch (err) {
    console.log("error: ", err);
  }
});

module.exports = router;
