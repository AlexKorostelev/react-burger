import {
  getProfile,
  login,
  logout,
  passwordReset,
  passwordResetWithCode,
  refreshToken,
  register,
  updateProfile
} from "../../utils/user-api";
import {deleteCookie, setCookie} from "../../utils/cookie";

export const USER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';
export const USER_GET_PROFILE_SUCCESS = 'USER_GET_PROFILE_SUCCESS';
export const USER_GET_PROFILE_FAILED = 'USER_GET_PROFILE_FAILED';
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS';
export const USER_UPDATE_PROFILE_FAILED = 'USER_UPDATE_PROFILE_FAILED';
export const USER_REFRESH_TOKEN_SUCCESS = 'USER_REFRESH_TOKEN_SUCCESS';
export const USER_REFRESH_TOKEN_FAILED = 'USER_REFRESH_TOKEN_FAILED';
export const USER_PASSWORD_RESET_SUCCESS = 'USER_PASSWORD_RESET_SUCCESS';
export const USER_PASSWORD_RESET_FAILED = 'USER_PASSWORD_RESET_FAILED';
export const USER_PASSWORD_RESET_WITH_CODE_SUCCESS = 'USER_PASSWORD_RESET_WITH_CODE_SUCCESS';
export const USER_PASSWORD_RESET_WITH_CODE_FAILED = 'USER_PASSWORD_RESET_WITH_CODE_FAILED';

export const registerUser = (name, email, password) => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  register(name, email, password)
    .then(data => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      dispatch({ type: USER_REGISTER_SUCCESS, data })})
    .catch(() => dispatch({ type: USER_REGISTER_FAILED }));
}

export const loginUser = (email, password) => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  return login(email, password)
    .then(data => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      dispatch({ type: USER_LOGIN_SUCCESS, data })})
    .catch(() => dispatch({ type: USER_LOGIN_FAILED }));
}

export const logoutUser = () => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  return logout()
    .then(data => {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      dispatch({ type: USER_LOGOUT_SUCCESS, data })
      return Promise.resolve();
    })
    .catch(() => dispatch({ type: USER_LOGOUT_FAILED }));
}

export const getUserProfile = () => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  getProfile()
    .then(data => {dispatch({ type: USER_GET_PROFILE_SUCCESS, data })})
    .catch((e) => {
      if (e.message === 'jwt expired') {
        return refreshToken()
          .then(data => {
            setCookie('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken);
            dispatch({ type: USER_REFRESH_TOKEN_SUCCESS })
          })
          .then(() => {
            getProfile()
              .then(data => dispatch({ type: USER_GET_PROFILE_SUCCESS, data }))
              .catch(() => {
                dispatch({ type: USER_GET_PROFILE_FAILED });
                dispatch({ type: USER_REFRESH_TOKEN_FAILED });
              });
          })
          .catch(() => dispatch({ type: USER_REFRESH_TOKEN_FAILED }))
      } else {
        dispatch({ type: USER_GET_PROFILE_FAILED });
      }
    });
}

export const updateUserProfile = (name, email) => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  updateProfile(name, email)
    .then(data => {dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, data })})
    .catch((e) => {
      if (e.message === 'jwt expired') {
        return refreshToken()
          .then(data => {
            setCookie('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken);
            dispatch({ type: USER_REFRESH_TOKEN_SUCCESS })
          })
          .then(() => {
            updateProfile(name, email)
              .then(data => dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, data }))
              .catch(() => {
                dispatch({ type: USER_UPDATE_PROFILE_FAILED });
                dispatch({ type: USER_REFRESH_TOKEN_FAILED });
              });
          });
      } else {
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS });
      }
    });
}

export const resetUserPassword = (email) => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  return passwordReset(email)
    .then(data => dispatch({ type: USER_PASSWORD_RESET_SUCCESS, data }))
    .catch(() => dispatch({ type: USER_PASSWORD_RESET_FAILED }));
}

export const resetUserPasswordWithCode = (password, code) => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  return passwordResetWithCode(password, code)
    .then(data => dispatch({ type: USER_PASSWORD_RESET_WITH_CODE_SUCCESS, data }))
    .catch(() => dispatch({ type: USER_PASSWORD_RESET_WITH_CODE_FAILED }));
}
