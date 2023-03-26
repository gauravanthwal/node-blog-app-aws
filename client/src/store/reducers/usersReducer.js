import { getStorage } from "../../utils/storage";
import { Types } from "../types";

const initialState = {
  user: {},
  userDetails: {},
  isAuth: false,
  isRegistrationSuccess: false,
};

export const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.user.LOGIN_USER_SUCCESS:
      return { ...state, user: payload, isAuth: true };
    case Types.user.SIGNUP_USER_SUCCESS:
      return { ...state, isRegistrationSuccess: true };
    case Types.user.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        user: { ...state.user, token: getStorage("token") },
      };
    case Types.user.GET_USER_SUCCESS:
      return { ...state, userDetails: payload };

    case Types.user.LOGIN_USER_FAILED:
    case Types.user.LOGOUT_USER:
    case Types.user.SIGNUP_USER_FAILED:
      return {
        ...state,
        isAuth: false,
        user: {},
        isRegistrationSuccess: false,
      };
    default:
      return state;
  }
};
