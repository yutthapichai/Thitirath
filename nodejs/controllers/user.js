const bcrypt = require("bcrypt");
const Signup = require("../models/user");

exports.UserSignup = (req, res, next) => {
  Signup.findOne({ email: req.body.email }).then(
    result => {
       if (result) {
         res.status(401).json({ message: "Have an email please new email"});
       } else {
         bcrypt.hash(req.body.password, 10).then(
           hash => {
             const user = new Signup({
               firstname: req.body.firstname,
               lastname: req.body.lastname,
               email: req.body.email,
               password: hash
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
