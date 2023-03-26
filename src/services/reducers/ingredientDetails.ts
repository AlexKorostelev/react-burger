import { SET_INGREDIENTS_DETAILS } from '../actions/ingredientDetails';
import { IIngredientWithCount } from './ingredients';

export interface IIngredientDetailsAction {
  type: typeof SET_INGREDIENTS_DETAILS;
  payload: IIngredientWithCount;
}

export const ingredientDetailsReducer = (
  state = {},
  action: IIngredientDetailsAction
) => {
  switch (action.type) {
    case SET_INGREDIENTS_DETAILS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
