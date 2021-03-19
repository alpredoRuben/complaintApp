import {SET_ORDER_CART} from '../utils/Constanta';

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

    default:
      return state;
  }
}
