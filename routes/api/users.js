const express = require("express");
const { body } = require("express-validator/check");

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
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid email address")
      .normalizeEmail(),
    body(
      "name",
      "Name must be between 2 and 20 characters"
    ).isLength({ min: 2, max: 20 }),
    body("password")
      .isLength({ min: 4 })
      .withMessage(
        "Password must be atleast 4 characters long"
      )
      .trim(),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password)
          throw new Error("Passwords do not match.!");
        return true;
      })
      .trim()
  ],
  postRegister
);

//@route POST api/users/login
//@desc  Logging in users
//@access public
router.post("/login", postLogin);

//@route GET api/users/current
//@desc  Get current logged in user
//@access private
router.get("/current", isAuth, getCurrentUser);

module.exports = router;
