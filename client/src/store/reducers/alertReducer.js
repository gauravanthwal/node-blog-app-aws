import { Types } from "../types";

const initialState = {
  showAlert: false,
  alerts: [
    // {
    //   id: "",
    //   message: "",
    //   alertType: "",
    //   type: "",
    // },
  ],
};

export const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.alert.SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, payload],
      };
    case Types.alert.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== payload),
      };
    default:
      return state;
  }
};
