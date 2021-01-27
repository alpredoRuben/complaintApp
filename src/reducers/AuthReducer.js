import {LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT} from '../utils/Constanta';

const initialStateLogin = {
  errors: null,
  userInfo: null,
};

const AuthReducer = (state = initialStateLogin, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, userInfo: action.payload, errors: null};
    case LOGIN_FAILED:
      return {...state, userInfo: null, errors: action.payload};
    case LOGOUT:
      state = initialStateLogin;
      return {};
    default:
      return state;
  }
};

export default AuthReducer;
