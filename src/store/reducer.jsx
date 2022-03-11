import { combineReducers } from "redux";
import ActionNames from "./constant";

const loginReducer = (state = false, action) => {
  switch (action.type) {
    case ActionNames.LOGIN:
      return (state = true);

    case ActionNames.LOGOUT:
      return (state = false);
    default:
      return state;
  }
};

const defaultReducer = combineReducers({
  login: loginReducer,
})

export default defaultReducer;