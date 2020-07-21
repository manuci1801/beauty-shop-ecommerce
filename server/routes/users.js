const router = require('express').Router()
const passport = require('passport')

const { userController } = require('../controllers')

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), userController.getUsers)

module.exports = router