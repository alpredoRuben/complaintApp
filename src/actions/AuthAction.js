import {LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT} from '../utils/Constanta';

export const successLoginAction = (data) => async (dispatch) => {
  dispatch({type: LOGIN_SUCCESS, payload: data});
};

export const failedLoginAction = (data) => async (dispatch) => {
  dispatch({type: LOGIN_FAILED, payload: data});
};

export const logoutAction = () => async (dispatch) => {
  dispatch({type: LOGOUT});
};
