/* eslint-disable eqeqeq */
import {
  SET_ORDER_CART,
  READ_ORDER_CART,
  ERROR_CART,
  DELETE_ORDER_CART,
  DESTROYED_ORDER,
} from '../utils/Constanta';

const initialState = {
  carts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_CART:
      return {
        ...state,
        carts: state.carts.concat(action.payload),
      };
    case READ_ORDER_CART:
      return {
        ...state,
        carts: action.payload,
      };

    case ERROR_CART:
      return {
        ...state,
        errors: action.payload,
      };
    case DELETE_ORDER_CART:
      const newCart = state.carts.filter(
        (item) => item.id != action.payload.id,
        [],
      );
      return {
        ...state,
        carts: newCart,
      };
    case DESTROYED_ORDER:
      return initialState;
    default:
      return state;
  }
}
