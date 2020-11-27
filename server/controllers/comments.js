const mongoose = require("mongoose");

const Comment = require("../models/Comment");

const addComment = async (req, res) => {
  try {
    const { content, productId } = req.body;
    if (!content)
      return res
        .status(400)
        .json({ field: "content", message: "content field is required" });

    if (!productId)
      return res
        .status(400)
        .json({ field: "product", message: "product field is required" });

    const newComment = new Comment({ user: req.user.id, content, productId });
    await newComment.save();

    res.json(newComment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const addReplyComment = async (req, res) => {
  try {
    const { content, commentId } = req.body;

    if (!content)
      return res
        .status(400)
        .json({ field: "content", message: "content field is required" });

    if (!commentId)
      return res
        .status(400)
        .json({ field: "comment", message: "comment field is required" });

    const newReplyComment = new Comment({
      user: req.user.id,
      content,
      commentId,
      isReply: true,
    });
    await newReplyComment.save();

    res.json(newReplyComment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Comment.aggregate([
      {
        $match: {
          productId: mongoose.Types.ObjectId("5fa93f4bc2286a0238693304"),
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "commentId",
          as: "replies",
        },
      },
    ]);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  addComment,
  addReplyComment,
  getAll,
};
