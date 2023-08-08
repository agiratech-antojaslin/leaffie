import { ADD_USER } from "./constants";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
};

// Reducers
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
};

export default UserReducer;
