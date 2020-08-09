const express = require("express");
var router = express.Router({ mergeParams: true }),
    passport =require("passport"),
    Admin =require("../../models/admin"),
    {f1aDash,f2aDash,f3aDash,f4aDash} =require("../../controllers/admin/dashboard"),
    {isAdmin} =require("../../middleware/index");


// @route to dashboard page
router.get("/",isAdmin,f1aDash);

// @route to add hacker
router.post("/add",isAdmin,f2aDash);

// @route to delete hacker
router.get("/delete/:hid",isAdmin,f4aDash);

// @route to edit hacker details
router.post("/edit/:hid",isAdmin,f3aDash);





module.exports=router;
