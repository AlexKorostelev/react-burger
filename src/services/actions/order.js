import {sendOrder} from "../../utils/burger-api";

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export const sendBurgerOrder = (order) => (dispatch) => {
  dispatch({ type: SEND_ORDER_REQUEST });
  sendOrder(order).then(data =>
    dispatch({
      type: SEND_ORDER_SUCCESS,
      orderNumber: data.order.number
    })).catch(() => dispatch({ type: SEND_ORDER_FAILED }));
}
