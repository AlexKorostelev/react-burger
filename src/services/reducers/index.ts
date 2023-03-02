import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { constructorItemsReducer } from './constructorItems';
import { ingredientDetailsReducer } from './ingredientDetails';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  order: orderReducer,
  ingredientDetails: ingredientDetailsReducer,
  user: userReducer,
});
