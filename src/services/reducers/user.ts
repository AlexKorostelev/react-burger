import {
  USER_REGISTER_FAILED,
  USER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
  USER_GET_PROFILE_SUCCESS,
  USER_GET_PROFILE_FAILED,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_REFRESH_TOKEN_FAILED,
  USER_REFRESH_TOKEN_SUCCESS,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_RESET_FAILED,
  USER_PASSWORD_RESET_WITH_CODE_SUCCESS,
  USER_PASSWORD_RESET_WITH_CODE_FAILED,
  TUserActionType,
} from '../actions/user';

export const initialState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: '',
  },
  isRequestError: false,
  isRequestProcess: false,
};

interface IUser {
  email: string;
  name: string;
}

export interface IUserAction {
  type?: TUserActionType;
  payload?: IUser;
}

export const userReducer = (state = initialState, action: IUserAction) => {
  switch (action.type) {
    case USER_REQUEST: {
      return {
        ...state,
        isRequestProcess: true,
      };
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.payload || initialState.user,
        isRequestError: false,
        isRequestProcess: false,
        isAuthChecked: true,
      };
    }
    case USER_REGISTER_FAILED:
    case USER_LOGIN_FAILED:
    case USER_GET_PROFILE_FAILED:
    case USER_LOGOUT_FAILED:
    case USER_PASSWORD_RESET_FAILED:
    case USER_PASSWORD_RESET_WITH_CODE_FAILED: {
      return {
        ...initialState,
        isRequestError: true,
      };
    }
    case USER_LOGIN_SUCCESS:
    case USER_GET_PROFILE_SUCCESS:
    case USER_UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.payload || initialState.user,
        isRequestError: false,
        isRequestProcess: false,
        isAuthChecked: true,
      };
    }
    case USER_LOGOUT_SUCCESS:
    case USER_REFRESH_TOKEN_FAILED: {
      return {
        ...initialState,
      };
    }
    case USER_REFRESH_TOKEN_SUCCESS:
    case USER_PASSWORD_RESET_SUCCESS:
    case USER_PASSWORD_RESET_WITH_CODE_SUCCESS: {
      return {
        ...state,
        isRequestProcess: false,
      };
    }
    default: {
      return state;
    }
  }
};
