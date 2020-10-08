const express = require("express");

const router = express.Router();

const feedController = require("../controllers/feed");

router.get("/blogs", feedController.getBlogs);

router.post("/blog", feedController.createBlog);

router.get("/blog/:blogId", feedController.getBlog);

router.put("/blog/:blogId", feedController.editBlog);

router.delete("/blog/:blogId", feedController.deleteBlog);

module.exports = router;
