const isAdmin = (req, res, next) => {
  if (req.user.role == "ROLE_ADMIN") next();
  else return res.status(401).json("Unauthorized");
};

module.exports = isAdmin;
