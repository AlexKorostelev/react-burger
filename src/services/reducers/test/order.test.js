import configureMockStore from 'redux-mock-store';
import { baseApiUrl } from '../../../utils/burger-api';
import thunk from 'redux-thunk';
import { orderReducer, initialState as orderInitialState } from '../order';
import { ingredient, orderData } from './mockData';
import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  sendBurgerOrder,
} from '../../actions/order';

describe('Order reducers', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // сбрасываем все mock-функции перед каждым тестом
  });

  it('should return the initial state', () => {
    expect(orderReducer(undefined, { payload: undefined })).toEqual(
      orderInitialState
    );
  });

  it('returns the order data when the API call is successful', async () => {
    // eslint-disable-next-line no-undef
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(orderData),
      ok: true,
    });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    await store.dispatch(sendBurgerOrder([ingredient]));
    const actions = store.getActions();

    expect(actions[0]).toMatchObject({
      type: SEND_ORDER_REQUEST,
    });

    expect(actions[1]).toEqual(
      expect.objectContaining({
        type: SEND_ORDER_SUCCESS,
        payload: 46381,
      })
    );

    expect(mockFetch).toHaveBeenCalledWith(`${baseApiUrl}/orders`, {
      body: '{"ingredients":["_id"]}',
      headers: {
        Authorization: '',
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'POST',
    });
  });
});
