const isAdmin = (req, res, next) => {
  if (req.user.role == 'admin')
    next()
  else
    return res.status(401).json('Unauthorized')
}

module.exports = isAdmin