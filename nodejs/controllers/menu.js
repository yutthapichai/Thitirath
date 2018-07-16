const MenuTable = require('../models/menu');

exports.addMenu = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const menu = new MenuTable({
    name: req.body.name,
    min60: req.body.min60,
    min90: req.body.min90,
    detail: req.body.detail,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });

  menu.save().then(
    result => {
      console.log(result);
      res.status(201).json({
        message: "Menu massage add success",
        menumassage: { iddd: result._id, ...result }
      });
    }
  );
}
