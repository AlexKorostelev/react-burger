import {getIngredients} from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';

export const getBurgerIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  getIngredients().then(data =>
    dispatch({
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: data.data.map(item => ({...item, count: 0}))
    })).catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
}

export const increaseIngredientCount = (id) => (dispatch) => {
    dispatch({ type: INCREASE_INGREDIENT_COUNT, id });
}

export const decreaseIngredientCount = (id) => (dispatch) => {
  dispatch({ type: DECREASE_INGREDIENT_COUNT, id });
}
