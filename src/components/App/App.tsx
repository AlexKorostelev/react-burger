import AppHeader from '../AppHeader/AppHeader';
import { useEffect } from 'react';
import Main from '../../pages/Main/Main';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import Profile from '../../pages/Profile/Profile';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import RequiredAuth from '../common/RequiredAuth';
import Orders from '../../pages/Orders/Orders';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import { getBurgerIngredients } from '../../services/actions/ingredients';
import { getUserProfile } from '../../services/actions/user';
import { useAppDispatch } from '../../services/hooks/useAppDispatch';
import { IIngredientsAction } from '../../services/reducers/ingredients';
import { IUserAction } from '../../services/reducers/user';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getBurgerIngredients() as unknown as IIngredientsAction);
    dispatch(getUserProfile() as unknown as IUserAction);
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<Main />} />
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/profile'
          element={
            <RequiredAuth redirectTo={'/login'}>
              <Profile />
            </RequiredAuth>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <RequiredAuth redirectTo={'/login'}>
              <Orders />
            </RequiredAuth>
          }
        />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal header='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
