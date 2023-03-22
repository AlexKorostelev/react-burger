import styles from './Orders.module.css';
import OrderTable from '../../components/OrderTable/OrderTable';
import { logoutUser } from '../../services/actions/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks/useAppDispatch';
import { useEffect } from 'react';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from '../../services/actions/websocket';
import { wssBaseApiUrl } from '../../utils/burger-api';
import { getCookie } from '../../utils/cookie';

const Orders = () => {
  const dispatch = useAppDispatch();
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${wssBaseApiUrl}?token=${
        getCookie('accessToken')?.split(' ')[1] || ''
      }`,
    });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  const handleUserLogoutClick = () => {
    (dispatch(logoutUser()) as unknown as Promise<string>).then(() =>
      navigate('/')
    );
  };

  const handleOrderHistoryClick = () => {
    navigate('/profile/orders');
  };

  const handleOrderProfileClick = () => {
    navigate('/profile');
  };

  const linkClassName = 'text text_type_main-medium mt-5 mb-5';
  const profileClassName = `${linkClassName} ${
    pathName === '/profile' ? '' : 'text_color_inactive'
  } ${styles.link}`;
  const orderHistoryClassName = `${linkClassName} ${
    pathName === '/profile/orders' ? '' : 'text_color_inactive'
  } ${styles.link}`;
  const logoutClassName = `${linkClassName} ${
    pathName === '/logout' ? '' : 'text_color_inactive'
  } ${styles.link}`;

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.blocks_container}>
          <div className={styles.menu_container}>
            <p className={profileClassName} onClick={handleOrderProfileClick}>
              Профиль
            </p>
            <p
              className={orderHistoryClassName}
              onClick={handleOrderHistoryClick}
            >
              История заказов
            </p>
            <p className={logoutClassName} onClick={handleUserLogoutClick}>
              Выход
            </p>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.orders_container}>
              <OrderTable isShowStatus />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
