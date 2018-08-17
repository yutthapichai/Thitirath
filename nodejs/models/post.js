const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  creater: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  title: { type: String, required: true},
  content: { type: String, required: true },
  date : { type: Date, default: Date.now },
  imagePath: { type: String, required: true },
  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "users"}
    }
  ],
  conmment : [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      title: { type: String, required: true },
      content: { type: String, required: true },
      date: { type: Date, default: Date.now },
    }
  ]
});

module.exports = mongoose.model('post', PostSchema);
