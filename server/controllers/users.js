const User = require('../models/User')

const getUsers = async (req, res) => {
  try {
    let { $limit, $skip, $sort } = req.query

    const users = await User.find().sort({ createdAt: $sort || -1 }).skip($skip || 0).limit($limit || 10)

    res.json({ success: true, data: users })
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  getUsers
}