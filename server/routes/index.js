const authRoute = require('./auth')
const userRoute = require('./users')

module.exports = app => {
  app.use('/api/auth', authRoute)
  app.use('/api/users', userRoute)

  return app
}