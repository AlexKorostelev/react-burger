import {nanoid} from "nanoid";
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const addIngredient = (ingredient) => (dispatch) => {
  dispatch({
    type: ADD_INGREDIENT,
    ingredient,
    id: nanoid()
  });
}

export const removeIngredient = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_INGREDIENT,
    id
  });
}

export const moveIngredient = (prevId, nextId) => (dispatch) => {
  dispatch({
    type: MOVE_INGREDIENT,
    prevId,
    nextId
  });
}
