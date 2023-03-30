import {
  SEND_ORDER_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  TOrderActionType,
} from '../actions/order';

export const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderNumber: 0,
};

export interface IOrderAction {
  type?: TOrderActionType;
  payload?: number;
}

export const orderReducer = (state = initialState, action: IOrderAction) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderNumber: 0,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        orderFailed: false,
        orderRequest: false,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...initialState,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
