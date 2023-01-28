import {combineReducers} from 'redux';
import {ingredientsReducer} from "./ingredients";
import {orderReducer} from "./order";
import {constructorItemsReducer} from "./constructorItems";
import {ingredientDetailsReducer} from "./ingredientDetails";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  order: orderReducer,
  ingredientDetails: ingredientDetailsReducer
});
