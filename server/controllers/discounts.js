const Discount = require("../models/Discount");

const addOne = async (req, res) => {
  try {
    const { discountRate, discountPrice, applyFor, id } = req.body;
    console.log(req.body);
    let data = {};
    if (!discountRate) {
      data = { ...data, discountPrice, applyFor };
    }
    if (!discountPrice) {
      data = { ...data, discountRate, applyFor };
    }
    if (applyFor == "category") data.category = id;
    if (applyFor == "subcategory") data.subcategory = id;
    if (applyFor == "brand") data.brand = id;

    const newDiscount = new Discount(data);
    await newDiscount.save();

    const _discount = await Discount.findById(newDiscount._id)
      .populate("category", "name")
      .populate("brand", "name")
      .populate("subcategory", "name");
    res.json(_discount);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getAll = async (req, res) => {
  try {
    const discounts = await Discount.find()
      .populate("category", "name")
      .populate("brand", "name")
      .populate("subcategory", "name");

    res.json(discounts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  await Discount.findByIdAndDelete(id);

  res.json({ success: true });
};

module.exports = {
  addOne,
  getAll,
  deleteOne,
};
