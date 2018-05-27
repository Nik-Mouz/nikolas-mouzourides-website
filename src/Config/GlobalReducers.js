import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "../Components/Canvas/CanvasActionReducer";

export default combineReducers({
  router: routerReducer,
  counter
});
