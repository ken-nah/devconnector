const express = require("express");

const router = express.Router();

//@route GET api/profile/test
//@desc  Testing
//@access private
router.get("/test", (req, res) => {
    return res.json({ message: "Profile route" });
});

module.exports = router;
