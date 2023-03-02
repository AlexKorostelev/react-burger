import { sendOrder } from '../../utils/burger-api';
import { TAppDispatch } from '../hooks/useAppDispatch';
import { IIngredient } from '../../pages/IngredientPage/IngredientPage';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export type TOrderActionType =
  | typeof SEND_ORDER_REQUEST
  | typeof SEND_ORDER_SUCCESS
  | typeof SEND_ORDER_FAILED;

export const sendBurgerOrder =
  (order: IIngredient[]) => (dispatch: TAppDispatch) => {
    dispatch({ type: SEND_ORDER_REQUEST });
    sendOrder(order)
      .then((data) =>
        dispatch({
          type: SEND_ORDER_SUCCESS,
          orderNumber: data.order.number,
        })
      )
      .catch(() => dispatch({ type: SEND_ORDER_FAILED }));
  };
