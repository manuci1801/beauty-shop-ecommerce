const router = require('express').Router()
const passport = require('passport')

const { userController } = require('../controllers')
const { isAdmin } = require('../middlewares')

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), isAdmin, userController.getAll)

module.exports = router