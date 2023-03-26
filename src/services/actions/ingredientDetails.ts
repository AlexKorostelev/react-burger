import { IIngredientWithCount } from '../reducers/ingredients';
import { AppActions } from '../store';

export const SET_INGREDIENTS_DETAILS = 'SET_INGREDIENTS_DETAILS';

export const setIngredientDetails = (
  ingredient: IIngredientWithCount
): AppActions => ({
  type: SET_INGREDIENTS_DETAILS,
  payload: ingredient,
});
