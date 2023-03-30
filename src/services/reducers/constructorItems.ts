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
  type?: TConstructorItemsActionType;
  payload?: { ingredient: IIngredientWithId; id: string } & string & {
      prevId: string;
      nextId: string;
    };
}

export const initialState = [
  { price: 0, id: '1', _id: '1' },
  { price: 0, id: '2', _id: '2' },
];

export const constructorItemsReducer = (
  state = initialState,
  action: IConstructorItemsAction
) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (
        action.payload?.ingredient &&
        action.payload.ingredient.type === 'bun'
      ) {
        const isBunWithSameIdExist = !!state.find(
          (item) =>
            item._id ===
            (action.payload?.ingredient && action.payload.ingredient._id)
        );

        return [
          {
            ...action.payload.ingredient,
            id: isBunWithSameIdExist ? state[0].id : action.payload.id + '_up',
          },
          ...state.slice(1, state.length - 1),
          {
            ...action.payload.ingredient,
            id: isBunWithSameIdExist
              ? state[state.length - 1].id
              : action.payload.id + '_down',
          },
        ];
      }

      return [
        ...state.slice(0, state.length - 1),
        { ...action.payload?.ingredient, id: action.payload?.id },
        ...state.slice(-1),
      ];
    }
    case REMOVE_INGREDIENT: {
      return state.filter((item) => item.id !== action.payload);
    }
    case MOVE_INGREDIENT: {
      const prevItem = state.find((item) => item.id === action.payload?.prevId);
      const nextItem = state.find((item) => item.id === action.payload?.nextId);

      return state.map((item) => {
        switch (item.id) {
          case action.payload?.prevId:
            return nextItem;
          case action.payload?.nextId:
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
