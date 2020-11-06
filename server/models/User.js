const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: () => {
      return this.provider === "local" ? true : false;
    },
  },
  avatar: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
  },
  provider: {
    type: String,
    enum: ["google", "facebook", "local"],
    default: "local",
  },
  role: {
    type: String,
    enum: ["ROLE_ADMIN", "ROLE_USER"],
    default: "ROLE_USER",
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    unique: true,
  },
  resetPasswordToken: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
