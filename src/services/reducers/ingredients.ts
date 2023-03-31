import {
  DECREASE_INGREDIENT_COUNT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT_COUNT,
  TIngredientsActionType,
} from '../actions/ingredients';
import { IIngredient } from '../../pages/IngredientPage/IngredientPage';

export interface IIngredientWithCount extends IIngredient {
  count: number;
}

export interface IIngredientsAction {
  type?: TIngredientsActionType;
  payload?: IIngredientWithCount[] | string;
}

interface IInitialState {
  ingredients: IIngredientWithCount[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

export const initialState: IInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: IIngredientsAction
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsFailed: false,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        ingredientsFailed: true,
      };
    }
    case INCREASE_INGREDIENT_COUNT: {
      const foundIngredient = state.ingredients.find(
        (item) => item._id === action.payload
      );
      const newIngredientType = (foundIngredient && foundIngredient.type) || '';

      return {
        ...state,
        ingredients: state.ingredients.map((item) => {
          return newIngredientType === 'bun'
            ? {
                ...item,
                count:
                  item._id === action.payload
                    ? 1
                    : item.type === 'bun'
                    ? 0
                    : item.count,
              }
            : {
                ...item,
                count:
                  item._id === action.payload ? item.count + 1 : item.count,
              };
        }),
      };
    }
    case DECREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((item) => {
          return {
            ...item,
            count: item._id === action.payload ? item.count - 1 : item.count,
          };
        }),
      };
    }
    default: {
      return state;
    }
  }
};
