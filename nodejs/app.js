const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const mongoose =require("mongoose");
const path = require("path"); //about ipload image

const userRoutes = require("./routes/user");
const menuRoutes = require("./routes/munu");
const postRoutes = require("./routes/post");
const DB = require('./config/keys').mongoURI

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("nodejs/images")));

mongoose
  .connect(
    DB,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.warn("Connected to database");
  })
  .catch(() => {
    console.warn("Connection failed");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/post", postRoutes);
module.exports = app;
