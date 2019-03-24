const express = require("express");
const { body } = require("express-validator/check");

const router = express.Router();

const isAuth = require("../../middlewares/is-auth");

const {
  createNewPost,
  getAllPosts,
  deletePostById,
  unlikeAPost,
  likeAPost,
  createANewComment,
  deleteAComment
} = require("../../controllers/posts");
//@route POST api/post
//@desc  Creating a new post
//@access private

router.post(
  "/",
  isAuth,
  [
    body(
      "text",
      "Text field is required and characters should be between 10 and 300 long"
    )
      .exists()
      .isLength({ min: 10, max: 300 })
  ],
  createNewPost
);

//@route Get api/post
//@desc  Creating a new post
//@access public
router.get("/", getAllPosts);

//@route Delete api/post/:postId
//@desc  Deleting a post
//@access private
router.delete("/:postId", isAuth, deletePostById);

//@route POST api/post/like/:postId
//@desc  Liking a post
//@access private
router.post("/like/:postId", isAuth, likeAPost);

//@route POST api/post/unlike/:postId
//@desc  unliking a post
//@access private
router.post("/unlike/:postId", isAuth, unlikeAPost);

//@route POST api/post/comment/:postId
//@desc  posting a new commment
//@access private
router.post(
  "/comment/:postId",
  [
    body("text")
      .exists()
      .withMessage("Text Field is required")
  ],
  isAuth,
  createANewComment
);

//@route DELETE api/post/comment/:postId/:commentId
//@desc  deleting a  commment
//@access private

router.delete(
  "/comment/:postId/:commentId",
  isAuth,
  deleteAComment
);

module.exports = router;
