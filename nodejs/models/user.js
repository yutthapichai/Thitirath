const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  firstname: { type: String, require: true},
  lastname: { type: String, require: true},
  email: { type: String, require: true, unigue: true},
  password: { type: String, require: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema); // User is table db
