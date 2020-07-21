const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { authValidation } = require('../validation')

const User = require('../models/User')

const register = async (req, res) => {
  try {
    const { isValid, errors } = authValidation.register(req.body)
    if (!isValid)
      res.status(400).json({ errors: errors })
    else {
      const { name, email, password, password2 } = req.body
      const userByEmail = await User.findOne({ email })

      if (!userByEmail) {
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
          name,
          email,
          password: hashPassword
        })
        await newUser.save()

        res.json({ success: true })
      } else {
        res.status(400).json({ errors: ['Email is exists'] })
      }
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const login = async (req, res) => {
  try {
    const { isValid, errors } = authValidation.login(req.body)
    if (!isValid)
      res.status(400).json({ errors: errors })
    else {
      const { email, password } = req.body

      const userByEmail = await User.findOne({ email })

      if (userByEmail) {
        const matchPassword = await bcryptjs.compare(password, userByEmail.password)
        if (matchPassword) {
          const payload = {
            id: userByEmail._id,
            email: userByEmail.email,
            role: userByEmail.role
          }
          const token = await jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: '6h' })

          res.json({ success: true, token: `Bearer ${token}` })
        } else {
          res.status(400).json({ errors: ['Password incorrect'] })
        }
      } else {
        res.status(400).json({ errors: ['Email is not exists'] })
      }
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  login,
  register
}