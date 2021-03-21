import {
  SET_ORDER_CART,
  READ_ORDER_CART,
  ERROR_CART,
  DELETE_ORDER_CART,
  DESTROYED_ORDER,
} from '../utils/Constanta';
import Api from '../utils/Api';
import Authorization from '../utils/Authorization';

export const getUserCart = () => async (dispatch, getState) => {
  const {userInfo} = getState().AuthReducer;

  try {
    const {data, status} = await Api.get(
      'wait/orders',
      Authorization(userInfo.token),
    );

    console.log('Get User Cart', data);

    if (status === 200) {
      dispatch({type: READ_ORDER_CART, payload: data.orders});
    }
  } catch (error) {
    dispatch({type: ERROR_CART, payload: error.response.data});
  }
};

export const addCartAction = (order) => async (dispatch) => {
  dispatch({
    type: SET_ORDER_CART,
    payload: order,
  });
};

export const deleteCartAction = (order) => async (dispatch) => {
  dispatch({
    type: DELETE_ORDER_CART,
    payload: order,
  });
};

export const destroyedOrderAction = () => async (dispatch) => {
  dispatch({type: DESTROYED_ORDER});
};
