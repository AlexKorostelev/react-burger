import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import type {} from 'redux-thunk/extend-redux';
import { TConstructorItemsActionType } from './actions/constructorItems';
import { TIngredientsActionType } from './actions/ingredients';
import { TOrderActionType } from './actions/order';
import { TUserActionType } from './actions/user';
import { ThunkAction } from 'redux-thunk';
import { TWsActionType } from './actions/websocket';
import { socketMiddleware } from './socketMiddleware';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware()))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;

export type AppActions = {
  type:
    | TConstructorItemsActionType
    | TIngredientsActionType
    | TOrderActionType
    | TUserActionType
    | TWsActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;
