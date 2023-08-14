import { ADD_CART, CLEAR_CART, GET_CART, REMOVE_CART } from "./constants";

let cartItems = JSON.parse(localStorage.getItem("myCart"));
let cartCount = 0;
let cartTotal = 0;
if (cartItems) {
  cartItems.forEach((element) => {
    cartCount = cartCount + element.quantity;
    cartTotal = cartTotal + (element.price * element.quantity);
  });
}
const initialState = {
  cart: { items: cartItems || [], count: cartCount, total:  cartTotal},
};

// Reducers
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        cart: {
          items: [...action.payload],
          count: state.cart.count + action.count,
          total: state.cart.total + action.total
        },
      };

    case REMOVE_CART:
      return {
        ...state,
        cart: {
          items: [...action.payload],
          count: state.cart.count - action.count,
          total: state.cart.total - action.total
        },
      };

    case GET_CART:
      return {
        ...state,
        cart: {
          items: [...state.cart.items],
          count: state.cart.count,
        },
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: {
          items: [],
          count: 0,
          total: 0
        }
      }

    default:
      return state;
  }
};

export default UserReducer;
