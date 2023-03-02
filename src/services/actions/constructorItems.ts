import { nanoid } from 'nanoid';
import { TAppDispatch } from '../hooks/useAppDispatch';
import { IIngredient } from '../../pages/IngredientPage/IngredientPage';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export type TConstructorItemsActionType =
  | typeof ADD_INGREDIENT
  | typeof REMOVE_INGREDIENT
  | typeof MOVE_INGREDIENT;

export const addIngredient =
  (ingredient: IIngredient) => (dispatch: TAppDispatch) => {
    dispatch({
      type: ADD_INGREDIENT,
      ingredient,
      id: nanoid(),
    });
  };

export const removeIngredient = (id: string) => (dispatch: TAppDispatch) => {
  dispatch({
    type: REMOVE_INGREDIENT,
    id,
  });
};

export const moveIngredient =
  (prevId: string, nextId: string) => (dispatch: TAppDispatch) => {
    dispatch({
      type: MOVE_INGREDIENT,
      prevId,
      nextId,
    });
  };
