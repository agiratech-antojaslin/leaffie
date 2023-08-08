import * as Constants from "./constants";


// export const getLogin = () => {
//   return({
//     type: LOGIN_SUCCESS
//   })
// }

// export const getLogout = () => {
//   return({
//     type: LOGOUT_SUCCESS
//   })
// }

// export const addUser = (user) => {
//   return({
//     type: ADD_USER,
//     payload: user
//   })
// }

export const ActionCreators = {

  getLogin: (user) => ({ type: Constants.LOGIN_SUCCESS, payload: user  }),

  getLogout: (image) => ({ type: Constants.LOGOUT_SUCCESS }),

  addUser: (user) => ({ type: Constants.ADD_USER, payload: user }),

  addCart: (product, count, total) => ({type: Constants.ADD_CART, payload: product, count: count, total: total}),

  removeCart: (product, count, total) => ({type: Constants.REMOVE_CART, payload: product, count: count, total: total}),

  getCart: (product) => ({type: Constants.GET_CART, payload: {product}}),

}