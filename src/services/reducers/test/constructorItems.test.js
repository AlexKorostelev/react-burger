import {
  constructorItemsReducer,
  initialState as constructorItemsInitialState,
} from '../constructorItems';
import { ingredient } from './mockData';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from '../../actions/constructorItems';

describe('Ingredients reducers', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // сбрасываем все mock-функции перед каждым тестом
  });

  it('should return the initial state', () => {
    expect(constructorItemsReducer(undefined, { payload: undefined })).toEqual(
      constructorItemsInitialState
    );
  });

  it('remove ingredient', () => {
    expect(
      constructorItemsReducer([{ ...ingredient, id: '_id' }], {
        type: REMOVE_INGREDIENT,
        payload: '_id',
      })
    ).toEqual([]);
  });

  it('add ingredient type === "bun"', () => {
    expect(
      constructorItemsReducer([...constructorItemsInitialState], {
        type: ADD_INGREDIENT,
        payload: { ingredient, id: 'generatedId' },
      })
    ).toEqual([
      { ...ingredient, id: 'generatedId_up' },
      { ...ingredient, id: 'generatedId_down' },
    ]);
  });

  it('add ingredient type === "sauce"', () => {
    expect(
      constructorItemsReducer([...constructorItemsInitialState], {
        type: ADD_INGREDIENT,
        payload: {
          ingredient: { ...ingredient, type: 'sauce' },
          id: 'generatedId',
        },
      })
    ).toEqual([
      constructorItemsInitialState[0],
      { ...ingredient, type: 'sauce', id: 'generatedId' },
      constructorItemsInitialState[1],
    ]);
  });
});
