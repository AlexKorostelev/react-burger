import configureMockStore from 'redux-mock-store';
import { baseApiUrl, getIngredients } from '../../../utils/burger-api';
import thunk from 'redux-thunk';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../../actions/ingredients.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getIngredients', () => {
  const fakeIngredientsData = {
    success: true,
    data: ['ingredients data'],
  };

  beforeEach(() => {
    jest.resetAllMocks(); // сбрасываем все mock-функции перед каждым тестом
  });

  it('returns the ingredients data when the API call is successful', async () => {
    // eslint-disable-next-line no-undef
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(fakeIngredientsData),
      ok: true,
    });

    const store = mockStore();

    await store.dispatch(getIngredients());
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: GET_INGREDIENTS_REQUEST,
      payload: undefined,
    });
    /*expect(actions[1]).toMatchObject({
      type: getIngredients.rejected.type,
      payload: undefined,
    });*/
    expect(actions[1]).toMatchObject({
      type: GET_INGREDIENTS_SUCCESS,
      payload: fakeIngredientsData.data,
    });
    expect(mockFetch).toHaveBeenCalledWith(`${baseApiUrl}/ingredients`, {
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
  });
});
