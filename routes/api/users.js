const express = require("express");

const router = express.Router();

//@route GET api/posts/test
//@desc  Testing
//@access public
router.get("/test", (req, res) => {
    return res.json({ message: "Users route" });
});

module.exports = router;
