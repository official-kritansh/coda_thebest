const express = require("express");
var router = express.Router({ mergeParams: true }),
    {f1uHacker,f2uHacker}=require("../../controllers/user/hacker");

// @route to details page
router.get("/profile/:cid",f1uHacker);

// @route to register a vote
router.get("/vote/:cid",f2uHacker);


module.exports=router;