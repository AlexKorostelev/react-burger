import styles from './Feed.module.css';
import OrderTable from '../../components/OrderTable/OrderTable';
import StatusOrder from '../../components/StatusOrder/StatusOrder';
import { useEffect } from 'react';
import {
  WS_CONNECTION_CLOSED,
  wsConnectionStart,
} from '../../services/actions/websocket';
import { useAppDispatch } from '../../services/hooks/useAppDispatch';
import { wssBaseApiUrl } from '../../utils/burger-api';

const Feed = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(wsConnectionStart(`${wssBaseApiUrl}/all`)), 500);

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <>
      <main className={styles.wrapper}>
        <div className={styles.column_container}>
          <p className='text text_type_main-large mt-10 mb-5'>Лента заказов</p>
          <OrderTable />
        </div>
        <div className={styles.separator} />
        <StatusOrder />
      </main>
    </>
  );
};

export default Feed;
