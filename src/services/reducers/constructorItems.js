import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../actions/constructorItems";
import {nanoid} from "nanoid";

const initialState = [{price: 0, id: '1'}, {price: 0, id: '2'}];

export const constructorItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === 'bun') {
        const isBunWithSameIdExist = !!state.find(item => item._id === action.ingredient._id);

        return [
          {...action.ingredient, id: isBunWithSameIdExist ? state[0].id : nanoid()},
          ...state.slice(1, state.length - 1),
          {...action.ingredient, id: isBunWithSameIdExist ? state[state.length - 1].id : nanoid()},
        ]
      }
      return [
        ...state.slice(0,state.length - 1),
        {...action.ingredient, id: nanoid()},
        ...state.slice(-1)
      ]
    }
    case REMOVE_INGREDIENT: {
      return state.filter(item => item.id !== action.id)
    }
    default: {
      return state;
    }
  }
};
