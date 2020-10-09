const { title } = require("process");
const Blog = require("../models/blog");

exports.getBlogs = (req, res, next) => {
  Blog.find()
    .then((blogs) => {
      if (!blogs) {
        const error = new Error("No blogs found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        blogs: [...blogs],
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
  const imageUrl = req.file.path;

  console.log("here");
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
  const imageUrl = req.body.imageUrl;
  Blog.findById(blogId)
    .then((blog) => {
      if (!blog) {
        const error = new Error("blog not found");
        error.statusCode = 404;
        throw error;
      }
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
  Blog.findByIdAndRemove(blogId)
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
