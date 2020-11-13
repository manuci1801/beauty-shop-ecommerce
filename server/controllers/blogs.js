const Blog = require("../models/Blog");
const BlogCategory = require("../models/BlogCategory");
const BlogTag = require("../models/BlogTag");

// add a new blog category
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ field: "name", message: "name field is required" });

    const newCategory = new BlogCategory({ name });
    await newCategory.save();

    res.json(newCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// get all blog categories
const getAllCategories = async (req, res) => {
  try {
    const blogCategories = await BlogCategory.find();

    res.json(blogCategories);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// add a new blog tag
const addTag = async (req, res) => {
  try {
    const { tag } = req.body;

    if (!tag)
      return res
        .status(400)
        .json({ field: "tag", message: "tag field is required" });

    const newTag = new BlogTag({ tag });
    await newTag.save();

    res.json(newTag);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// get all blog tags
const getAllTags = async (req, res) => {
  try {
    const blogTags = await BlogTag.find();

    res.json(blogTags);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// add a new blog
const addBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        errors: [{ field: "image", message: "image field is required" }],
      });
    }

    const { title, content, category, tags } = req.body;

    const newBlog = new Blog({
      title,
      cover: req.file.filename,
      content,
      category,
      tags,
    });

    console.log(newBlog);
    await newBlog.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  addTag,
  getAllTags,
  addBlog,
};
