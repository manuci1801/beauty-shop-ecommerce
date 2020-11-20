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
    console.log(err);
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
    console.log(req.body);

    const { title, content, category, tags } = req.body;

    const newBlog = new Blog({
      author: req.user.id,
      title,
      cover: req.file.filename,
      content,
      category,
      tags: JSON.parse(tags),
    });

    await newBlog.save();

    const blog = await Blog.findById(newBlog._id)
      .populate("author", ["name"])
      .populate("category", ["name"]);

    res.json(blog);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// get all blogs
const getAll = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author", ["name"])
      .populate("category", ["name"]);

    res.json(blogs);
    // await newBlog.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// get a blog by id
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id)
      .populate("author", ["name"])
      .populate("category", ["name"]);

    res.json(blog);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// delete a blog by id
const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const uploadImgContent = async (req, res) => {
  try {
    console.log(req.files);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;

    const file = req.file;
    const { title, content, category, tags } = req.body;

    const updateData = {};
    if (file) updateData.cover = file.filename;
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (tags) updateData.tags = JSON.parse(tags);

    await Blog.findByIdAndUpdate(id, updateData, { new: true });

    const _blog = await Blog.findById(id)
      .populate("author", ["name"])
      .populate("category", ["name"]);

    res.json(_blog);
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
  getAll,
  getById,
  deleteOne,
  uploadImgContent,
  updateOne,
};
