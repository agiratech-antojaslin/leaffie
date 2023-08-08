import { combineReducers, createStore } from "redux";
import AuthReducer from "./reducer";
import UserReducer from "./userReducer";
import cartReducer from "./cartReducer";

//const store = createStore(AuthReducer);
const allReducers = combineReducers({AuthReducer, UserReducer, cartReducer})

export default allReducers;