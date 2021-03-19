import {SET_ORDER_CART} from '../utils/Constanta';

export const addCartAction = (order) => async (dispatch) => {
  dispatch({
    type: SET_ORDER_CART,
    payload: order,
  });
};
