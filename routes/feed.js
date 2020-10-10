const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();

const feedController = require("../controllers/feed");
const isAuth = require("../util/isAuth");

router.get("/blogs", isAuth, feedController.getBlogs);

router.post(
  "/blog",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createBlog
);

router.get("/blog/:blogId", isAuth, feedController.getBlog);

router.put(
  "/blog/:blogId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.editBlog
);

router.delete("/blog/:blogId", isAuth, feedController.deleteBlog);

module.exports = router;
