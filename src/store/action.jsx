import ActionNames from "./constant";

export const loginAction = () => {
  return {
    type: ActionNames.LOGIN,
  }
}

export const logoutAction = () => {
  return {
    type: ActionNames.LOGOUT,
  }
}