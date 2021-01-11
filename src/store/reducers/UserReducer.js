import {USER_LOGIN} from '../Constanta';

export const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN.SUCCESS:
      return {user_info: action.payload};
    case USER_LOGIN.FAILED:
      return {errors: action.payload};
    default:
      return state;
  }
};
