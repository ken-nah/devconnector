const {
  validationResult
} = require("express-validator/check");

//post model
const Post = require("../models/Post");
const Profile = require("../models/Profile");

exports.createNewPost = (req, res, next) => {
  //check for validation errors first

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const allErrors = {};
    for (let { param, msg } of validationErrors.array())
      allErrors[param] = msg;
    return res.status(400).json(allErrors);
  }

  const { text, name, avatar } = req.body;
  const newPost = new Post({
    text,
    name,
    avatar,
    user: req.id
  });

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => next(err));
};

//view all posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then(posts => res.json(posts))
    .catch(err => next(err));
};

//delete a post by id
exports.deletePostById = (req, res, next) => {
  Post.findById(req.params.postId)
    .then(post => {
      if (!post) {
        const error = new Error(
          "Post with that Id not Found.."
        );
        error.statusCode = 404;
        throw error;
      }

      if (post.user.toString() !== req.id) {
        const error = new Error(
          "Unauthorized..You're not the right owner "
        );
        error.statusCode = 401;
        throw error;
      }

      return post.remove();
    })
    .then(removedPost =>
      res.json({ msg: "Success post deleted" })
    )
    .catch(err => next(err));
};

//liking a post
exports.likeAPost = (req, res, next) => {
  Post.findById(req.params.postId)
    .then(post => {
      if (
        post.likes.filter(
          like => like.user.toString() === req.id
        ).length
      )
        return res.status(400).json({
          alreadyLiked: "You have already liked this post.."
        });
      //add user to the likes array

      post.likes.push({ user: req.id });
      post.save().then(post => res.json(post));
    })
    .catch(err => next(err));
};

//unliking a post
exports.unlikeAPost = (req, res, next) => {
  Post.findById(req.params.postId)
    .then(post => {
      if (
        post.likes.filter(
          like => like.user.toString() === req.id
        ).length === 0
      )
        return res.status(400).json({
          notLiked: "You have not liked this post yet.."
        });

      //remove the user from the likes array
      const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.id);

      post.likes.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch(err => next(err));
};
