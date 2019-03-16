const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

exports.postRegister = (req, res) => {
  let newUser;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user)
        return res
          .status(400)
          .json({ email: "User already exists.." });

      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      return bcrypt.hash(newUser.password, 12);
    })
    .then(hashedPassword => {
      console.log(hashedPassword);
      newUser.password = hashedPassword;
      return newUser.save();
    })
    .then(savedUser => {
      return res.json(savedUser);
    })
    .catch(err => console.log(err.message));
};
