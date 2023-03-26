import styles from './OrderIdPage.module.css';
import OrderNumberInfo from '../../components/OrderNumberInfo/OrderNumberInfo';
import { useAppDispatch } from '../../services/hooks/useAppDispatch';
import { useEffect } from 'react';
import {
  WS_CONNECTION_CLOSED,
  wsConnectionStart,
} from '../../services/actions/websocket';
import { wssBaseApiUrl } from '../../utils/burger-api';
import { useAppSelector } from '../../services/hooks/useAppSelector';
import { selectWsConnectionStatus } from '../../utils/selectors';

const OrderIdPage = () => {
  const dispatch = useAppDispatch();
  const wsConnected = useAppSelector(selectWsConnectionStatus);

  useEffect(() => {
    wsConnected !== true && dispatch(wsConnectionStart(`${wssBaseApiUrl}/all`));

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return <div className={styles.wrapper}>{<OrderNumberInfo />}</div>;
};

export default OrderIdPage;
