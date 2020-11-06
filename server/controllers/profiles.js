const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const Address = require("../models/Address");
const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    const { email, password, name, phone, birthday, gender } = req.body;

    let dataUpdate = {};
    if (email) {
      dataUpdate.email = email;
    }
    if (email) {
      dataUpdate.password = await argon2.hash(password);
    }
    if (email) {
      dataUpdate.name = name;
    }
    if (email) {
      dataUpdate.phone = phone;
    }
    if (email) {
      dataUpdate.birthday = birthday;
    }
    if (email) {
      dataUpdate.gender = gender;
    }

    const user = await User.findByIdAndUpdate(req.user.id, dataUpdate);

    const { _id, _name, _email, role } = user;
    const payload = {
      id: _id,
      _name,
      _email,
      role,
    };
    const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
      expiresIn: "24h",
    });

    res.json({ token: `Bearer ${token}` });

    res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addAddress = async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    const newAddress = new Address({
      user: req.user.id,
      name,
      address,
      phone,
    });

    await newAddress.save();
    res.json(newAddress);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getAddressesOfUser = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.json(addresses);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  addAddress,
  getAddressesOfUser,
};
