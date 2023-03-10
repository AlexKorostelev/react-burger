import {
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
  TConstructorItemsActionType,
} from '../actions/constructorItems';
import { IIngredient } from '../../pages/IngredientPage/IngredientPage';

interface IIngredientWithId extends IIngredient {
  id?: string;
}

export interface IConstructorItemsAction {
  type: TConstructorItemsActionType;
  ingredient?: IIngredientWithId;
  id?: string;
  prevId?: string;
  nextId?: string;
}

const initialState = [
  { price: 0, id: '1', _id: '1' },
  { price: 0, id: '2', _id: '2' },
];

export const constructorItemsReducer = (
  state = initialState,
  action: IConstructorItemsAction
) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient && action.ingredient.type === 'bun') {
        const isBunWithSameIdExist = !!state.find(
          (item) => item._id === (action.ingredient && action.ingredient._id)
        );

        return [
          {
            ...action.ingredient,
            id: isBunWithSameIdExist ? state[0].id : action.id + '_up',
          },
          ...state.slice(1, state.length - 1),
          {
            ...action.ingredient,
            id: isBunWithSameIdExist
              ? state[state.length - 1].id
              : action.id + '_down',
          },
        ];
      }

      return [
        ...state.slice(0, state.length - 1),
        { ...action.ingredient, id: action.id },
        ...state.slice(-1),
      ];
    }
    case REMOVE_INGREDIENT: {
      return state.filter((item) => item.id !== action.id);
    }
    case MOVE_INGREDIENT: {
      const prevItem = state.find((item) => item.id === action.prevId);
      const nextItem = state.find((item) => item.id === action.nextId);

      return state.map((item) => {
        switch (item.id) {
          case action.prevId:
            return nextItem;
          case action.nextId:
            return prevItem;
          default:
            return item;
        }
      });
    }
    default: {
      return state;
    }
  }
};
