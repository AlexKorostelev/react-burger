import {SET_INGREDIENTS_DETAILS} from "../actions/ingredientDetails";

const initialState = {
  ingredientDetails: {},
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_DETAILS: {
      return {
        ...state,
        ...action.ingredientDetails
      };
    }
    default: {
      return state;
    }
  }
};
