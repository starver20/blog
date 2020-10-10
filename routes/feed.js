const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();

const feedController = require("../controllers/feed");

router.get("/blogs", feedController.getBlogs);

router.post(
  "/blog",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createBlog
);

router.get("/blog/:blogId", feedController.getBlog);

router.put(
  "/blog/:blogId",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.editBlog
);

router.delete("/blog/:blogId", feedController.deleteBlog);

module.exports = router;
