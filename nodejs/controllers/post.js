const postTable = require("../models/post");

exports.storePost = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  let fetchresult;

  const post = new postTable({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/" + req.body.image,
    //imagePath: url + "/" + req.file.filename, //true insert
    creater: req.body.create
  });

  post
    .save()
    .then(data => {
      fetchresult = data;
      return postTable.countDocuments();
    })
    .then(result => {
      return res.status(201).json({
        message: "",
        maxcount: result,
        post: {
          id: fetchresult._id,
          imagePath: fetchresult.imagePath,
          creater: fetchresult.creater
        }
      });
    })
    .catch(err => res.status(500).json({ message: 'create post fail!!'}));
};
