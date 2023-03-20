import styles from './OrderNumberInfo.module.css';
import { FC, useEffect } from 'react';

interface IOrderNumberInfoProps {
  orderNumber: number;
}

const OrderNumberInfo: FC<IOrderNumberInfoProps> = ({ orderNumber }) => {
  // const orders: IOrder[] = useAppSelector(selectOrders) || [];
  // const ingredients: IIngredient[] =
  //   useAppSelector(selectIngredients).ingredients || [];

  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  return (
    <div className={styles.wrapper}>
      <p className='text text_type_main-default'>#{orderNumber}</p>
      <div className={styles.composition_blocks}>
        <h1>info</h1>
      </div>
    </div>
  );
};

export default OrderNumberInfo;
