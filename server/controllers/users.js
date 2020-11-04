const argon2 = require("argon2");

const User = require("../models/User");

const getMany = async (req, res) => {
  try {
    let { $limit, $skip, $sort } = req.query;
    // await User.find({ _id: { $ne: req.user.id } }) // find all users not include current user
    const users = await User.find()
      .sort({ createdAt: $sort || -1 })
      .skip($skip || 0)
      .limit($limit || 10);

    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addOne = async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;

    const newUser = new User({
      name,
      email,
      password: await argon2.hash(password),
      role,
      phone,
      address,
    });

    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getMany,
  addOne,
};
