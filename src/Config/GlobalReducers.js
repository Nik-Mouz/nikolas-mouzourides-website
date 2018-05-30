import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import enemyReducer from "../Components/Enemy/EnemyActionReducer";

export default combineReducers({
  router: routerReducer,
  enemyReducer
});
