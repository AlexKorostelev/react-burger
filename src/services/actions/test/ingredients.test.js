import {
  DECREASE_INGREDIENT_COUNT,
  decreaseIngredientCount,
  INCREASE_INGREDIENT_COUNT,
  increaseIngredientCount,
} from '../ingredients';

describe('Ingredients action creators', () => {
  it('Увеличение количества ингредиентов на 1', () => {
    const id = '60d3b41abdacab0026a733c6';
    const expectedAction = {
      type: INCREASE_INGREDIENT_COUNT,
      payload: id,
    };
    expect(increaseIngredientCount(id)).toEqual(expectedAction);
  });

  it('Уменьшение количества ингредиентов на 1', () => {
    const id = '60d3b41abdacab0026a733c6';
    const expectedAction = {
      type: DECREASE_INGREDIENT_COUNT,
      payload: id,
    };
    expect(decreaseIngredientCount(id)).toEqual(expectedAction);
  });
});
