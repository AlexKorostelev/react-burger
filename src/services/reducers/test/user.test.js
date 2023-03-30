import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState as userInitialState, userReducer } from '../user';
import { userData } from './mockData';
import {
  getUserProfile,
  logoutUser,
  USER_GET_PROFILE_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REQUEST,
} from '../../actions/user';
import { authApiUrl } from '../../../utils/user-api';
import { getCookie } from '../../../utils/cookie';

describe('User reducers', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // сбрасываем все mock-функции перед каждым тестом
  });

  it('should return the initial state', () => {
    expect(userReducer(undefined, { payload: undefined })).toEqual(
      userInitialState
    );
  });

  it('get profile reducer', async () => {
    // eslint-disable-next-line no-undef
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(userData),
      ok: true,
    });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    await store.dispatch(getUserProfile());
    const actions = store.getActions();

    expect(actions[0]).toMatchObject({
      type: USER_REQUEST,
    });

    expect(actions[1]).toEqual(
      expect.objectContaining({
        type: USER_GET_PROFILE_SUCCESS,
        payload: { email: 'user@email.ru', name: 'Alex' },
      })
    );

    expect(mockFetch).toHaveBeenCalledWith(`${authApiUrl}/user`, {
      headers: { Authorization: getCookie('accessToken') || '' },
      method: 'GET',
    });
  });

  it('user logout reducer', async () => {
    // eslint-disable-next-line no-undef
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(userData),
      ok: true,
    });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    await store.dispatch(logoutUser());
    const actions = store.getActions();

    expect(actions[0]).toMatchObject({
      type: USER_REQUEST,
    });

    expect(actions[1]).toEqual(
      expect.objectContaining({
        type: USER_LOGOUT_SUCCESS,
      })
    );

    expect(mockFetch).toHaveBeenCalledWith(`${authApiUrl}/logout`, {
      body: '{}',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      method: 'POST',
    });
  });
});
