const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.userlogin = (req, res, next) => {
  let fetchuser;
  User.findOne({ email: req.body.email, useractive: 1 }).then(
    user => {
      if(!user){ // user is table data model
        res.status(401).json({ message: "Don't have an email, please contact Admin" });
      }else{
        fetchuser = user;
        return bcrypt.compare(req.body.password, user.password);
      }
    }
  ).then(
    result => {
      if (!result) { // result is boolean
        res.status(401).json({ message: "password don't match"});
      } else {
        const token = jwt.sign(
          { email:fetchuser.email, userId: fetchuser._id},
          "secret_this_should_be_longer",
          { expiresIn: "1h"}
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchuser._id
        });
      }
    }
  );
}

exports.UserSignup = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    result => {
      if (result) { // user is table data model
        res.status(401).json({ message: "Have an email please new email"});
      } else {
        bcrypt.hash(req.body.password, 10).then(
          hash => {
            const user = new User({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash,
              useractive: 0
             });
            user.save().then(
              result => {
                res.status(200).json({ message: "User created", result: result});
              }
            );
          }
        );
       }
    }
  );
};
