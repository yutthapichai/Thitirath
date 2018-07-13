const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const usersignup = mongoose.Schema({
  firstname: { type: String, require: true},
  lastname: { type: String, require: true},
  email: { type: String, require: true, unigue: true},
  password: { type: String, require: true }
});

usersignup.plugin(uniqueValidator);
module.exports = mongoose.model('Usersignup', usersignup);
