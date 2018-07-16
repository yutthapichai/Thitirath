const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  name:      { type: String, require: true },
  min60:     { type: Number, require: true },
  min90:     { type: Number, require: true },
  detail:    { type: String, require: true },
  imagePath: { type: String, require: true },
  creator:   { type: mongoose.Schema.Types.ObjectId, require: true }
});

module.exports = mongoose.model('menuMassage',menuSchema);
