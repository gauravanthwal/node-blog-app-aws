const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const PORT = 5000;
const { connectDB } = require("./connection");
const { Blog } = require("./models/blogSchema");

const userRoute = require("./routes/users");
const blogRoute = require("./routes/blogs");

const { checkForAuthCookie } = require("./middlewares/auth");

// DB connection
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(checkForAuthCookie("token"));

app.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});

    res.render("home", { user: req.user, blogs });
  } catch (err) {
    console.log("error", err);
  }
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log("server is running at port ", PORT));
