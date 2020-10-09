const { title } = require("process");
const Blog = require("../models/blog");

const clearImage = require("../util/clearFile");

exports.getBlogs = (req, res, next) => {
  Blog.find()
    .then((blogs) => {
      if (!blogs) {
        const error = new Error("No blogs found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "found these blogs",
        blogs: { ...blogs },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.createBlog = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path.replace("\\", "/");

  console.log(req.file);

  const blog = new Blog({
    title: title,
    content: content,
    imageUrl: imageUrl,
  });
  blog.save().then((result) => {
    res.status(201).json({
      message: "blog created",
      blog: blog,
    });
  });
};

exports.getBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  Blog.findById(blogId)
    .then((blog) => {
      if (!blog) {
        const error = new Error("blog not found");
        error.statusCode = 404;
        throw error;
      }
      console.log(blog);
      res.status(200).json({
        message: "blog found",
        blog: blog,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.file.path.replace("\\", "/");

  Blog.findById(blogId)
    .then((blog) => {
      if (!blog) {
        const error = new Error("blog not found");
        error.statusCode = 404;
        throw error;
      }
      if (!imageUrl) {
        imageUrl = blog.imageUrl;
      }
      clearImage(blog.imageUrl);
      blog.title = title;
      blog.content = content;
      blog.imageUrl = imageUrl;
      return blog.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "blog editied successfully",
        blog: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  Blog.findById(blogId)
    .then((blog) => {
      return clearImage(blog.imageUrl);
    })
    .then((result) => {
      return Blog.findByIdAndRemove(blogId);
    })
    .then((result) => {
      res.status(200).json({ messagel: "Blog deleted successfully" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
