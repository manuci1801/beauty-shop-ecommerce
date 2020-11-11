const voucher_codes = require("voucher-code-generator");

const Coupon = require("../models/Coupon");

function generateCoupon() {
  const possible =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return new Promise((resolve, reject) => {
    let coupon = "";
    for (var i = 0; i < 8; i++) {
      coupon += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    resolve(coupon);
  });
}

const generateUniqueCoupon = () => {
  return new Promise(async (resolve, reject) => {
    let code = await generateCoupon();

    const isExists = await Coupon.findOne({ code });
    if (isExists) return generateUniqueCoupon();
    else resolve(code);
  });
};

const addOne = async (req, res) => {
  try {
    const {
      name,
      description,
      usableCount,
      discountRate,
      discountPrice,
    } = req.body;

    let code = await generateUniqueCoupon();

    if (!Boolean(discountPrice) && !Boolean(discountRate))
      return res.status(400).json({
        field: "discount",
        message: "discount rate or price is required",
      });

    let data = { name, usableCount };

    if (Boolean(description)) data = { ...data, description };
    if (Boolean(discountRate)) data = { ...data, discountRate };
    else if (Boolean(discountPrice)) data = { ...data, discountPrice };

    const newCoupon = new Coupon({ ...data, code });
    await newCoupon.save();

    res.json(newCoupon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const checkValidCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    if (!Boolean(code))
      return res
        .status(400)
        .json({ field: "code", message: "code is required" });
    else {
      const coupon = await Coupon.findOne({ code });

      if (Boolean(coupon) && coupon.usableCount > 0)
        return res.json({ coupon });
      else
        return res.status(400).json({ field: "code", message: "code invalid" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAll = async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.json(coupons);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  await Coupon.findByIdAndDelete(id);

  res.json({ success: true });
};

module.exports = {
  addOne,
  checkValidCoupon,
  getAll,
  deleteOne,
};
