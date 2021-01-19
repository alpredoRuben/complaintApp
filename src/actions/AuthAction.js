import {LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT} from '../utils/Constanta';
import Api from '../utils/Api';

export const loginAction = (form) => async (dispatch) => {
  try {
    const {data, status} = await Api.post('/login', {
      username: form.username,
      password: form.password,
    });

    console.log('RESULT OF REQUEST API', {data, status});

    if (status === 200) {
      dispatch({type: LOGIN_SUCCESS, payload: data});
    } else {
      dispatch({type: LOGIN_FAILED, payload: {data, status}});
    }
  } catch (err) {
    const {data, status} = err.response;
    if (status === 422) {
      dispatch({type: LOGIN_FAILED, payload: {data, status}});
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    const result = await Api.get('/logout');
    console.log(result);
    dispatch({type: LOGOUT});
  } catch (err) {
    console.log(err.response);
  }
};
