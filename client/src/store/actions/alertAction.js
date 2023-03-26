import { Types } from "../types";

export const setAlert = (alert) => (dispatch) => {
  dispatch({
    type: Types.alert.SET_ALERT,
    payload: alert,
  });
};

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: Types.alert.REMOVE_ALERT,
    payload: id,
  });
};
