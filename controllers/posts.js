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

//creating a comment
exports.createANewComment = (req, res, next) => {
  //check for validation errors first

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const allErrors = {};
    for (let { param, msg } of validationErrors.array())
      allErrors[param] = msg;
    return res.status(400).json(allErrors);
  }

  Post.findById(req.params.postId)
    .then(post => {
      if (post) {
        const { text, name, avatar } = req.body;
        const newComment = {
          text,
          name,
          avatar,
          user: req.id
        };
        post.comments.push(newComment);
        return post.save();
      }

      return res
        .status(404)
        .json({ noPost: "No Such post found.." });
    })
    .then(updatedPost => res.json(updatedPost))
    .catch(err => next(err));
};

//deleting a comment
exports.deleteAComment = (req, res, next) => {
  Post.findById(req.params.postId)
    .then(post => {
      //check if the post exists, if not throw an error
      if (!post) {
        const error = new Error("No such post was found");
        error.statusCode = 404;
        throw error;
      }

      //the post exists then we have to find for the comment
      const comment = post.comments.filter(
        comment =>
          comment._id.toString() === req.params.commentId
      );

      if (!comment.length)
        return res.status(404).json({
          comment: "Comment does not exist"
        });

      //the comment exists we have to make sure the right owner is deleting it
      if (comment[0].user.toString() !== req.id)
        return res.status(401).json({
          comment:
            "You cannot delete other people's comment"
        });

      //let's get the comment index and remove it from the comments array

      const removeIndex = post.comments
        .map(comment => comment._id.toString())
        .indexOf(req.params.commentId);

      post.comments.splice(removeIndex, 1);
      post
        .save()
        .then(updatedPost => res.json(updatedPost));
    })
    .catch(err => next(err));
};
