import { SET_CURRENT_USER, SET_KEYS } from "../types";

import isEmpty from "../../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  keys: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case SET_KEYS:
      return {
        ...state,
        keys: action.payload,
      };
    default:
      return state;
  }
}
