const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validationResult
} = require("express-validator/check");

const { secret } = require("../config/keys");

exports.postRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const allErrors = {};
    for (let { param, msg } of errors.array())
      allErrors[param] = msg;
    return res.status(400).json(allErrors);
  }

  let newUser;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        const error = new Error("User already Exists..");
        error.statusCode = 400;
        throw error;
      }

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
      newUser.password = hashedPassword;
      return newUser.save();
    })
    .then(savedUser => {
      return res.json(savedUser);
    })
    .catch(err => next(err));
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  //check whether email exists

  User.findOne({ email })
    .then(user => {
      if (!user)
        return res
          .status(401)
          .json({ user: "Invalid Username or Password" });

      //compare passwords to see if it's valid

      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            //we are here because passwords matched -> generate token

            const payload = {
              id: user._id,
              name: user.name,
              avatar: user.avatar
            };
            const token = jwt.sign(payload, secret, {
              expiresIn: "1h"
            });
            return res.status(200).json({
              msg: "Authenticated..",
              token
            });
          }
          return res
            .status(401)
            .json({ user: "Invalid username or password" });
        });
    })
    .catch(err => console.log(err.message));
};

exports.getCurrentUser = (req, res) => {
  const { id, name, avatar } = req;
  res.status(200).json({
    id,
    name,
    avatar
  });
};
