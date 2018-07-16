const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const mongoose =require("mongoose");
const path = require("path");

const userRoutes = require("./routes/user");
const menuRoutes = require("./routes/munu");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("nodejs/images")));

mongoose
  .connect(
    "mongodb://localhost:27017/tritirath",
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

module.exports = app;
