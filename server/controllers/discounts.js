const Discount = require("../models/Discount");

const addOne = async (req, res) => {
  try {
    const {
      discountRate,
      discountPrice,
      applyFor,
      id,
      startAt,
      endAt,
    } = req.body;

    let data = {};
    if (startAt) {
      const _startAt = startAt.split("/");
      data = {
        ...data,
        startAt:
          _startAt.length > 1
            ? new Date(_startAt[2], _startAt[1] - 1, _startAt[0])
            : new Date(startAt),
      };
    }
    if (endAt) {
      const _endAt = endAt.split("/");
      data = {
        ...data,
        endAt:
          _endAt.length > 1
            ? new Date(_endAt[2], _endAt[1] - 1, _endAt[0])
            : new Date(endAt),
      };
    }
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
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAll = async (req, res) => {
  try {
    const discounts = await Discount.find({
      startAt: { $lt: new Date() },
      $or: [{ endAt: null }, { endAt: { $gte: new Date() } }],
    })
      .populate("category", "name")
      .populate("brand", "name")
      .populate("subcategory", "name");

    res.json(discounts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getAllByAdmin = async (req, res) => {
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
  getAllByAdmin,
};
