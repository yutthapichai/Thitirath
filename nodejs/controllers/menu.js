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
      res.status(201).json({
        message: "Menu massage add success",
        menu: { id: result._id, ...result }
      });
    }
  ).catch(
    err => {
      res.status(500).json({ message: "Create menu fail!" });
    }
  );
}

exports.fetchMenu = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const menuQuery = MenuTable.findOne();
  let fetchedMenu;
  if (pageSize && currentPage) {
    menuQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  menuQuery.find().then(
    data => {
      fetchedMenu = data;
      return MenuTable.countDocuments();
    }
  ).then(
    count => {
      res.status(200).json({
        message: "fetch menu success",
        menues: fetchedMenu,
        maxMenu: count
      });
    }
  ).catch(
    err => {
      res.status(500).json({ message: "Fetch menu failed!"});
    }
  );
}
