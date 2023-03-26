import { AppActions, AppThunk } from '../store';
import { useDispatch as dispatchHook } from 'react-redux/es/hooks/useDispatch';

//fix Thunk typing https://github.com/reduxjs/redux-thunk/issues/333
export type TAppDispatch<TReturnType = void> = (
  action: AppActions | AppThunk
) => TReturnType;
export const useAppDispatch: () => TAppDispatch = dispatchHook;
