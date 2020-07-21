const validator = require('validator')

const isEmpty = require('../utils/isEmpty')

const register = data => {
  let errors = [], isValid

  const { name, email, password, password2 } = data
  if (!name || !email || !password || !password2)
    errors.push('Please fill all fields')
  else {
    if (!validator.isLength(name, { min: 6, max: 255 }))
      errors.push('Name must be between 6 and 255 characters')

    if (!validator.isEmail(email))
      errors.push('Email is not valid')

    if (!validator.matches(password, /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/i))
      errors.push('Password must be minimum six characters, at least one letter, one number and one special character')
    else {
      if (password !== password2) {
        errors.push('Password confirm does not match')
      }
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

const login = data => {
  let errors = [], isValid

  const { email, password } = data
  if (!email || !password)
    errors.push('Please fill all fields')
  else {
    if (!validator.isEmail(email))
      errors.push('Email is not valid')
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = {
  register,
  login
}