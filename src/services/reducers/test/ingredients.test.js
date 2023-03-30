import configureMockStore from 'redux-mock-store';
import { baseApiUrl } from '../../../utils/burger-api';
import thunk from 'redux-thunk';
import {
  DECREASE_INGREDIENT_COUNT,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  getBurgerIngredients,
  INCREASE_INGREDIENT_COUNT,
} from '../../actions/ingredients';
import {
  ingredientsReducer,
  initialState as ingredientsInitialState,
} from '../ingredients';
import { ingredient } from './mockData';

describe('Ingredients reducers', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // сбрасываем все mock-функции перед каждым тестом
  });

  const fakeIngredientsData = {
    success: true,
    data: [ingredient],
  };
  const fakeIngredientsDataWithCount = [{ ...ingredient, count: 0 }];

  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, { payload: undefined })).toEqual(
      ingredientsInitialState
    );
  });

  it('decrease ingredient count', () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [{ ...ingredient, count: 2 }],
          ingredientsRequest: false,
          ingredientsFailed: false,
        },
        {
          type: DECREASE_INGREDIENT_COUNT,
          payload: '_id',
        }
      )
    ).toEqual({
      ingredients: [{ ...ingredient, count: 1 }],
      ingredientsRequest: false,
      ingredientsFailed: false,
    });
  });

  it('increase ingredient count type = "bun"', () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [{ ...ingredient, count: 1 }],
          ingredientsRequest: false,
          ingredientsFailed: false,
        },
        {
          type: INCREASE_INGREDIENT_COUNT,
          payload: '_id',
        }
      )
    ).toEqual({
      ingredients: [{ ...ingredient, count: 1 }],
      ingredientsRequest: false,
      ingredientsFailed: false,
    });
  });

  it('increase ingredient count type !== "bun"', () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [{ ...ingredient, count: 1, type: 'sauce' }],
          ingredientsRequest: false,
          ingredientsFailed: false,
        },
        {
          type: INCREASE_INGREDIENT_COUNT,
          payload: '_id',
        }
      )
    ).toEqual({
      ingredients: [{ ...ingredient, type: 'sauce', count: 2 }],
      ingredientsRequest: false,
      ingredientsFailed: false,
    });
  });

  it('returns the ingredients data when the API call is successful', async () => {
    // eslint-disable-next-line no-undef
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(fakeIngredientsData),
      ok: true,
    });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    await store.dispatch(getBurgerIngredients());
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: GET_INGREDIENTS_REQUEST,
    });

    // expect(actions[1]).toMatchObject({
    //   type: GET_INGREDIENTS_SUCCESS,
    //   payload: fakeIngredientsData.data.map((item) => ({ ...item, count: 0 })),
    // });

    expect(actions[1]).toEqual(
      expect.objectContaining({
        type: GET_INGREDIENTS_SUCCESS,
        payload: fakeIngredientsDataWithCount,
      })
    );

    expect(mockFetch).toHaveBeenCalledWith(`${baseApiUrl}/ingredients`);
  });
});
