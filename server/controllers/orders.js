const Order = require("../models/Order");

const addOne = async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body, user: req.user.id });

    await newOrder.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAllOfUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const addOneNoAuth = async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body });

    await newOrder.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAll = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.productId", ["name"])
      .populate("user", ["name", "email"]);
    res.json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  addOne,
  getAllOfUser,
  getAll,
  addOneNoAuth,
};
