const express = require("express");
const { body } = require("express-validator/check");

const router = express.Router();

const isAuth = require("../../middlewares/is-auth");

//import profile route controller
const {
  getCurrentUserProfile,
  createOrUpdateUserProfile,
  getProfileByHandle,
  getProfileByUserId,
  getAllProfiles
} = require("../../controllers/profile");

//@route GET api/profile
//@desc  Get current user profile
//@access private
router.get("/", isAuth, getCurrentUserProfile);

//@route POST api/profile
//@desc  Create or update user profile
//@access private
router.post(
  "/",
  [
    body("handle")
      .exists()
      .withMessage("Handle Field is required"),
    body("skills")
      .exists()
      .withMessage("Skills Field is required"),
    body("status")
      .exists()
      .withMessage("Status Field is required"),
    body("location")
      .exists()
      .withMessage("Where are you located")
  ],
  isAuth,
  createOrUpdateUserProfile
);

//@route GET api/profile/handle/:handle
//@desc  Get  user by handle
//@access public

router.get("/handle/:handle", getProfileByHandle);

//@route GET api/profile/user/:user_id
//@desc  Get  user by id
//@access public

router.get("/user/:user_id", getProfileByUserId);

//@route GET api/profile/all
//@desc  Get  all user profiles
//@access public

router.get("/all", getAllProfiles);

module.exports = router;
