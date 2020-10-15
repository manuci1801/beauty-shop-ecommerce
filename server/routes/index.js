const authRoute = require('./auth')
const userRoute = require('./users')
const brandRoute = require('./brands')
const productRoute = require('./products')

module.exports = app => {
  app.use('/api/auth', authRoute)
  app.use('/api/users', userRoute)
  app.use('/api/brands', brandRoute)
  app.use('/api/products', productRoute)

  return app
}