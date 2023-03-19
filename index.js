const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;
const { connectDB } = require("./connection");

const userRoute = require("./routes/users");

// DB connection
connectDB();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log("server is running at port ", PORT));
