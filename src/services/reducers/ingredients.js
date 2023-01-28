import {
  DECREASE_INGREDIENT_COUNT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT_COUNT
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
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
        ingredients: action.ingredients,
        ingredientsFailed: false,
        ingredientsRequest: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        ingredientsFailed: true
      };
    }
    case INCREASE_INGREDIENT_COUNT: {
      const newIngredientType = state.ingredients.find(item => item._id === action.id).type;

      return {
        ...state,
        ingredients: state.ingredients.map(item => {
          return newIngredientType === "bun"
            ? { ...item, count: item._id === action.id ? 1 : item.type === "bun" ? 0 : item.count }
            : { ...item, count: item._id === action.id ? item.count + 1 : item.count };
        }),
      };
    }
    case DECREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map(item => {
          return { ...item, count: item._id === action.id ? item.count - 1 : item.count };
        }),
      };
    }
    default: {
      return state;
    }
  }
};
