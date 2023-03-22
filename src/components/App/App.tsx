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
import Feed from '../../pages/Feed/Feed';
import OrderNumberInfo from '../OrderNumberInfo/OrderNumberInfo';
import FeedIdPage from '../../pages/FeedIdPage/FeedIdPage';
import OrderIdPage from '../../pages/OrderIdPage/OrderIdPage';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<Main />} />
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:id' element={<FeedIdPage />} />
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
        <Route
          path='/profile/orders/:id'
          element={
            <RequiredAuth redirectTo={'/login'}>
              <OrderIdPage />
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
          <Route
            path='/feed/:id'
            element={
              <Modal>
                <OrderNumberInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <Modal>
                <OrderNumberInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
