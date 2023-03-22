import { TAppDispatch } from '../hooks/useAppDispatch';
import { IIngredientWithCount } from '../reducers/ingredients';

export const SET_INGREDIENTS_DETAILS = 'SET_INGREDIENTS_DETAILS';

export const setIngredientDetails =
  (ingredient: IIngredientWithCount) => (dispatch: TAppDispatch) => {
    dispatch({
      type: SET_INGREDIENTS_DETAILS,
      payload: ingredient,
    });
  };
