import Api from '../utils/Api';
import Authorization from '../utils/Authorization';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  SET_USER,
} from '../utils/Constanta';

export const successLoginAction = (data) => async (dispatch) => {
  dispatch({type: LOGIN_SUCCESS, payload: data});
};

export const failedLoginAction = (data) => async (dispatch) => {
  dispatch({type: LOGIN_FAILED, payload: data});
};

export const logoutAction = () => async (dispatch) => {
  dispatch({type: LOGOUT});
};

export const setUserAction = () => async (dispatch, getState) => {
  const {userInfo} = getState().AuthReducer;

  try {
    const {data, status} = await Api.get(
      'info/user',
      Authorization(userInfo.token),
    );

    if (status === 200) {
      dispatch({
        type: SET_USER,
        payload: {token: userInfo.token, user: data.result},
      });
    }
  } catch (err) {
    console.log(err.response);
  }
};
