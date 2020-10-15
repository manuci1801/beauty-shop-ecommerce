const router = require('express').Router()

const { brandController } = require('../controllers')
const {isAuth, isAdmin} = require('../middleware')

router
  .route('/')
  .get(brandController.getMany)
  .post(isAuth, isAdmin , brandController.addOne)

router
  .route('/:id')
  .delete(isAuth, isAdmin, brandController.deleteOne)

module.exports = router
