import { getIngredients } from '../../utils/burger-api';
import { TAppDispatch } from '../hooks/useAppDispatch';
import { IIngredient } from '../../pages/IngredientPage/IngredientPage';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';

export type TIngredientsActionType =
  | typeof GET_INGREDIENTS_REQUEST
  | typeof GET_INGREDIENTS_SUCCESS
  | typeof GET_INGREDIENTS_FAILED
  | typeof INCREASE_INGREDIENT_COUNT
  | typeof DECREASE_INGREDIENT_COUNT;

export const getBurgerIngredients = () => (dispatch: TAppDispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  getIngredients()
    .then((data) =>
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: data.data.map((item: IIngredient) => ({
          ...item,
          count: 0,
        })),
      })
    )
    .catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
};

export const increaseIngredientCount =
  (id: string) => (dispatch: TAppDispatch) => {
    dispatch({ type: INCREASE_INGREDIENT_COUNT, id });
  };

export const decreaseIngredientCount =
  (id: string) => (dispatch: TAppDispatch) => {
    dispatch({ type: DECREASE_INGREDIENT_COUNT, id });
  };
