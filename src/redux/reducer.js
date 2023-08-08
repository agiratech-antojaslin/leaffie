import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./constants";

const initialState = {
  isAuthenticated: localStorage.getItem('authApp') === "true" ? true : false,
  user: JSON.parse(localStorage.getItem('loggedUser')) || {}
};

// Reducers
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('authApp', true)
      return {
        //...state,
        isAuthenticated: true,
        user: action.payload
      };

    case LOGOUT_SUCCESS:
      localStorage.setItem('authApp', false)
      return {
        //...state,
        isAuthenticated: false,
        user: {}
      };

    default:
      return state;
  }
};

export default AuthReducer;