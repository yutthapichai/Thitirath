const MenuTable = require('../models/menu');

exports.addMenu = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  let fetchresult;
  const menu = new MenuTable({
    name: req.body.name,
    min60: req.body.min60,
    min90: req.body.min90,
    detail: req.body.detail,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });

  menu.save().then(
    data => {
      fetchresult = data;
      return MenuTable.countDocuments();
    }
  ).then(
    result => {
      res.status(201).json({
        message: "Menu massage add success",
        maxcount: result,
        menu: {
          id: fetchresult._id,
          imagePath: fetchresult.imagePath,
          creator: fetchresult.creator
        }
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

exports.deleteMenu = (req, res, next) => {
  let resultdelete;
  MenuTable.deleteOne({ _id: req.params.id}).then(
    data => {
      resultdelete = data;
      return MenuTable.countDocuments();
    }
  ).then(
    result => {
      if(resultdelete.n > 0) {
        res.status(200).json({ message: 'Delete success', maxMenu: result });
      }else{
        res.status(401).json({ message: 'Not authorized!'});
      }
    }
  ).catch(
    err => {
      res.status(500).json({ message: 'Could not delete menu!'});
    }
  );
}

exports.editMenu = (req, res, next) => {
  MenuTable.findById(req.params.id).then(
    result => {
      if(result) {
        res.status(200).json(result);
      }else{
        res.status(404).json({ message: "Menu not found!"});
      }
    }
  ).catch(
    err => {
      res.status(500).json({ message: "Get menu is error"});
    }
  );
}

exports.updateMenu = (req, res, next) => {
  let ImagePath = req.body.imagePath;
  if (req.file) {
    //new image
    const url = req.protocol + '://' + req.get('host');
    ImagePath = url + '/images/' + req.file.filename;
  }
  const menu = new MenuTable({
    _id: req.body.id,
    name: req.body.name,
    min60: req.body.min60,
    min90: req.body.min90,
    detail: req.body.detail,
    imagePath: ImagePath,
    creator: req.userData.userId
  });
  MenuTable.updateOne({ _id: req.params.id }, menu).then(
    result => {
      if(result.n > 0) {
        res.status(200).json({ message: 'Update success'});
      } else {
        res.status(401).json({ message: 'Not authorizad!'});
      }
    }
  ).catch(
    err => {
      res.status(500).json({ message: 'Could not update Menu' + err});
    }
  );
}
