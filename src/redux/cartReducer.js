import { ADD_CART, GET_CART, REMOVE_CART } from "./constants";

let cartItems = JSON.parse(localStorage.getItem("myCart"));
let cartCount = 0;
let cartTotal = 0;
if (cartItems) {
  cartItems.forEach((element) => {
    cartCount = cartCount + element.qty;
    cartTotal = cartTotal + (element.price * element.qty);
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

    default:
      return state;
  }
};

export default UserReducer;
