import { SET_INGREDIENTS_DETAILS } from '../../actions/ingredients';

import { ingredient } from './mockData';
import { ingredientDetailsReducer } from '../ingredientDetails';

describe('Ingredient details reducers', () => {
  it('should return the initial state', () => {
    expect(ingredientDetailsReducer(undefined, { payload: undefined })).toEqual(
      {}
    );
  });

  it('set ingredient details', () => {
    expect(
      ingredientDetailsReducer(
        {},
        {
          type: SET_INGREDIENTS_DETAILS,
          payload: ingredient,
        }
      )
    ).toEqual(ingredient);
  });
});
