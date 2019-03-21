const {
  validationResult
} = require("express-validator/check");

//models
const Profile = require("./../models/Profile");

exports.getCurrentUserProfile = (req, res, next) => {
  const errors = {};

  //find whether the logged in user has a profile
  Profile.findOne({ user: req.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.profile = "No profile Found for this user";
        return res.status(404).json(errors);
      }
      return res.status(200).json(profile);
    })
    .catch(err => next(err));
};

exports.createOrUpdateUserProfile = async (
  req,
  res,
  next
) => {
  //check for validation errors first

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const allErrors = {};
    for (let { param, msg } of validationErrors.array())
      allErrors[param] = msg;
    return res.status(400).json(allErrors);
  }

  const profileFields = {};
  profileFields.user = req.id;

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

  //..Let's find whether the user has a profile

  Profile.findOne({ user: req.id })
    .then(profileExists => {
      //..We're here because the profile exists
      if (profileExists) {
        Profile.findOneAndUpdate(
          { user: req.id },
          { $set: profileFields },
          { new: true }
        )
          .then(updatedProfile => res.json(updatedProfile))
          .catch(err => next(err));
      } else {
        //..otherwise it doesn't exists -> we need to create a new one

        //..but first let's confirm the user has a unique handle
        Profile.findOne({ handle: profileFields.handle })
          .then(handleExists => {
            if (handleExists)
              return res.status(400).json({
                handle:
                  "Handle is taken..Choose another one.!"
              });

            //.. Handle is unique -> proceed to create a new profile
            return new Profile(profileFields).save();
          })
          .then(createdProfile => res.json(createdProfile))
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
};

//get profile by handle
exports.getProfileByHandle = (req, res, next) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile =
          "There is no profile with that handle";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => next(err));
};

//get profile by user_id
exports.getProfileByUserId = (req, res, next) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile =
          "There is no user profile with that id";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => next(err));
};

//get all profiles
exports.getAllProfiles = (req, res, next) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles)
        return res
          .status(400)
          .json("There no profiles yet..");
      return res.json(profiles);
    })
    .catch(err => next(err));
};
