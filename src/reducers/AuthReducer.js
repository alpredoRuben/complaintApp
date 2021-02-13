import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_USER,
} from '../utils/Constanta';

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
      return initialStateLogin;
    case SET_USER:
      return {...state, userInfo: action.payload};
    default:
      return state;
  }
};

export default AuthReducer;
