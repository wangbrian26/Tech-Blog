const router = require("express").Router();
const commentRoute = require("./comment-routes.js");
const postRoute = require("./post-routes.js");
const userRoute = require("./user-routes.js");

router.use("/comment", commentRoute);
router.use("/post", postRoute);
router.use("/user", userRoute);

module.exports = router;
