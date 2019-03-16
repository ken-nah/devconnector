const express = require("express");

const router = express.Router();

//authentication middleware
const isAuth = require("../../middlewares/is-auth");

const {
  postRegister,
  postLogin,
  getCurrentUser
} = require("../../controllers/users");

//@route GET api/users/test
//@desc  Testing
//@access public
router.get("/test", (req, res) => {
  return res.json({ message: "Users route" });
});

//@route POST api/users/register
//@desc  Registering a new user
//@access public
router.post("/register", postRegister);

//@route POST api/users/login
//@desc  Logging in users
//@access public
router.post("/login", postLogin);

//@route GET api/users/current
//@desc  Get current logged in user
//@access private
router.get("/current", isAuth, getCurrentUser);

module.exports = router;
