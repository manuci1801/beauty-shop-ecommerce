const authRoute = require('./auth')
const userRoute = require('./users')

module.exports = app => {
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/users', userRoute)

  return app
}