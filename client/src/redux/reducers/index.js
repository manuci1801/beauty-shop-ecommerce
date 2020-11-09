import { combineReducers } from 'redux'

import authReducer from './auth'
import errorReducer from './error'
import productReducer from './products'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  products: productReducer
})