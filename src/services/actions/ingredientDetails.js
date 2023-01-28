export const SET_INGREDIENTS_DETAILS = 'SET_INGREDIENTS_DETAILS';

export const setIngredientDetails = (ingredient) => (dispatch) => {
  dispatch({
    type: SET_INGREDIENTS_DETAILS,
    ingredientDetails: ingredient
  })
}
