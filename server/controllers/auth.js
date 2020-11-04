const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { authValidation } = require("../validation");

const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { isValid, errors } = authValidation.register(req.body);
    if (!isValid) res.status(400).json({ errors: errors });
    else {
      const { name, email, password } = req.body;
      const userByEmail = await User.findOne({ email });

      if (!userByEmail) {
        const hashPassword = await argon2.hash(password);

        const newUser = new User({
          name,
          email,
          password: hashPassword,
        });
        await newUser.save();

        res.json({ newUser });
      } else {
        res.status(400).json({
          errors: [{ field: "email", message: "user already exists" }],
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { isValid, errors } = authValidation.login(req.body);
    if (!isValid) res.status(400).json({ errors: errors });
    else {
      const { email, password } = req.body;

      const userByEmail = await User.findOne({ email });

      if (userByEmail) {
        const matchPassword = await argon2.verify(
          userByEmail.password,
          password
        );
        if (matchPassword) {
          const { _id, name, role } = userByEmail;
          const payload = {
            id: _id,
            name,
            email,
            role,
          };
          const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, {
            expiresIn: "24h",
          });

          res.json({ token: `Bearer ${token}` });
        } else {
          res.status(400).json({
            errors: [{ field: "password", message: "password incorrect" }],
          });
        }
      } else {
        res.status(400).json({
          errors: [{ field: "email", message: "email is not exists" }],
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  login,
  register,
};
