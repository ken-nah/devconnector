const express = require("express");
const isAuth = require("../../middlewares/is-auth");

const router = express.Router();

//import profile route controller
const {
  getCurrentUserProfile,
  createOrUpdateUserProfile
} = require("../../controllers/profile");


//@route GET api/profile
//@desc  Get current user profile
//@access private
router.get("/", isAuth, getCurrentUserProfile);

//@route POST api/profile
//@desc  Create or update user profile
//@access private
router.post("/", isAuth, createOrUpdateUserProfile);

module.exports = router;
