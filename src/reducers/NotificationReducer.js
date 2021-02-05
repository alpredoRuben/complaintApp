import {RESET_TOTAL_NOTIF, SET_TOTAL_NOTIF} from '../utils/Constanta';

const initialState = {
  total: 0,
};

export const SetTotalNotification = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOTAL_NOTIF:
      return {...state, total: action.payload};
    case RESET_TOTAL_NOTIF:
      return {...state, total: 0};
    default:
      return state;
  }
};
