const Discount = require("../models/Discount");

const addOne = async (req, res) => {
  try {
    const { discountRate, discountPrice, applyFor, id } = req.body;
    let data;
    if (!discountRate) {
      data = { ...discountPrice, applyFor };
    } else if (!discountPrice) {
      data = { ...discountRate, applyFor };
    }
    if (applyFor == "category") data.category = id;
    if (applyFor == "subcategory") data.subcategory = id;
    if (applyFor == "brand") data.brand = id;

    const newDiscount = new Discount(data);

    await newDiscount.save();
    res.json(newDiscount);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  addOne,
};
