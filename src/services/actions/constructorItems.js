export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const addIngredient = (ingredient) => (dispatch) => {
  dispatch({
    type: ADD_INGREDIENT,
    ingredient
  });
}

export const removeIngredient = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_INGREDIENT,
    id
  });
}
