const Order = require("../models/Order");

const addOne = async (req, res) => {
  try {
    const { name, phone, address, note, products, total } = req.body;
    const newOrder = new Order({
      name,
      phone,
      address,
      note: note ? note : "",
      products,
      total,
    });

    await newOrder.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  addOne,
};
