const express = require("express");

const router = express.Router();

const { postRegister } = require("../../controllers/users");

//@route GET api/posts/test
//@desc  Testing
//@access public
router.get("/test", (req, res) => {
  return res.json({ message: "Users route" });
});

//@route POST api/posts/test
//@desc  Registering a new user
//@access public
router.post("/register", postRegister);

module.exports = router;
