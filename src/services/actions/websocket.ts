import { AppActions } from '../store';

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const WS_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE';

export type TWsActionType =
  | typeof WS_CONNECTION_START
  | typeof WS_CONNECTION_SUCCESS
  | typeof WS_CONNECTION_ERROR
  | typeof WS_CONNECTION_CLOSED
  | typeof WS_GET_MESSAGE
  | typeof WS_SEND_MESSAGE
  | typeof WS_USER_NAME_UPDATE;

export const wsConnectionStart = (url: string): AppActions => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsGetMessage = (message: string) => {
  return {
    type: WS_GET_MESSAGE,
    payload: JSON.parse(message),
  };
};
