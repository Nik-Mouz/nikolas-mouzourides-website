import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "../Components/Home/HomeActionReducer";

export default combineReducers({
  router: routerReducer,
  counter
});
