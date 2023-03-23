import { nanoid } from 'nanoid';
import { IIngredient } from '../../pages/IngredientPage/IngredientPage';
import { AppActions } from '../store';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export type TConstructorItemsActionType =
  | typeof ADD_INGREDIENT
  | typeof REMOVE_INGREDIENT
  | typeof MOVE_INGREDIENT;

export const addIngredient = (ingredient: IIngredient): AppActions => ({
  type: ADD_INGREDIENT,
  payload: { ingredient, id: nanoid() },
});

export const removeIngredient = (id: string): AppActions => ({
  type: REMOVE_INGREDIENT,
  payload: id,
});

export const moveIngredient = (prevId: string, nextId: string): AppActions => ({
  type: MOVE_INGREDIENT,
  payload: { prevId, nextId },
});
