const {
  validationResult
} = require("express-validator/check");

//models
const Profile = require("./../models/Profile");
const User = require("../models/User");

exports.getCurrentUserProfile = (req, res, next) => {
  const errors = {};

  //find whether the logged in user has a profile
  Profile.findOne({ user: req.id })
    .populate("users", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.profile = "No profile Found for this user";
        return res.status(404).json(errors);
      }
      return res.status(200).json(profile);
    })
    .catch(err => next(err));
};

exports.createOrUpdateUserProfile = (req, res, next) => {
  //check for validation errors first

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const allErrors = {};
    for (let { param, msg } of validationErrors.array())
      allErrors[param] = msg;
    return res.status(400).json(allErrors);
  }

  const profileFields = {};
  const errors = {};

  //get all the fields from the req body
  const {
    handle,
    website,
    company,
    location,
    bio,
    status,
    githubUsername,
    skills,
    youtube,
    facebook,
    instagram,
    linkedin,
    twitter
  } = req.body;

  if (handle) profileFields.handle = handle;
  if (website) profileFields.website = website;
  if (company) profileFields.company = company;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubUsername)
    profileFields.githubUsername = githubUsername;

  //skills should be separated at comma & stored as an array
  if (skills) profileFields.skills = skills.split(",");

  //social pages remember should be stored in an object
  profileFields.social = {};

  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (youtube) profileFields.social.youtube = youtube;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  Profile.findOne({ user: req.id })
    .then(profile => {
      if (profile) {
        //user exists so we are updating his info
        Profile.findOneAndUpdate(
          { user: req.id },
          { $set: profileFields },
          { new: true }
        )
          .then(userProfile => res.json(userProfile))
          .catch(err => next(err));
      } else {
        //user doesn't exist instead we're creating a new profile BUT..

        //1.check whether the handle exits if it does user must choose another

        Profile.findOne({
          handle: profileFields.handle
        })
          .then(handleExists => {
            if (handleExists) {
              errors.handle =
                "Handle exists, Please choose another one";
              return res.status(400).json(errors);
            }

            //we are here because the handle doesn't exist -> create User profile
            const newProfile = new Profile(profileFields);
            newProfile
              .save()
              .then(newProfile => res.json(newProfile))
              .catch(next(err));
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
};
