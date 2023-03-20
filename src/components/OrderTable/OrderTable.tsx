import { FC, useMemo } from 'react';
import styles from './OrderTable.module.css';
import { selectIngredients, selectOrders } from '../../utils/selectors';
import Order, { IOrder } from '../Order/Order';
import { useAppSelector } from '../../services/hooks/useAppSelector';
import { useSelector } from 'react-redux';
import { IIngredient } from '../../pages/IngredientPage/IngredientPage';

export interface IOrderExt extends IOrder {
  price: number;
  pictures: string[];
  isShowStatus?: boolean;
}

interface IOrderTableProps {
  isShowStatus?: boolean;
}

const OrderTable: FC<IOrderTableProps> = ({ isShowStatus }) => {
  const orders: IOrder[] = useAppSelector(selectOrders) || [];
  const ingredients: IIngredient[] =
    useSelector(selectIngredients).ingredients || [];

  const ordersExt: IOrderExt[] = useMemo(() => {
    return (
      orders.map((item) => ({
        ...item,
        price: item.ingredients.reduce(
          (acc, cur) =>
            (ingredients.find((ingredient) => ingredient._id === cur)?.price ||
              0) + acc,
          0
        ),
        pictures: item.ingredients.map(
          (i) => ingredients.find((j) => j._id === i)?.image_mobile || ''
        ),
      })) || []
    );
  }, [orders]);

  return (
    <div className={styles.cards_wrapper}>
      {ordersExt.map((order: IOrderExt) => (
        <Order
          key={order._id}
          _id={order._id}
          ingredients={order.ingredients}
          status={order.status}
          name={order.name}
          createdAt={order.createdAt}
          updatedAt={order.updatedAt}
          number={order.number}
          price={order.price}
          pictures={order.pictures}
          isShowStatus={isShowStatus}
        />
      ))}
    </div>
  );
};

export default OrderTable;
