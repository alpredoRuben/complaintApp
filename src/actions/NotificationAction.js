import {SET_TOTAL_NOTIF, RESET_TOTAL_NOTIF} from '../utils/Constanta';

export const setTotalNotif = (total) => async (dispatch) => {
  dispatch({type: SET_TOTAL_NOTIF, payload: total});
};

export const resetTotalNotif = () => async (dispatch) => {
  dispatch({type: RESET_TOTAL_NOTIF});
};
