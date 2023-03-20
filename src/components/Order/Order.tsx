import { FC } from 'react';
import styles from './Order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrderExt } from '../OrderTable/OrderTable';
import moment from 'moment';
import 'moment/locale/ru';
import { useNavigate } from 'react-router-dom';

export interface IOrder {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

const Order: FC<IOrderExt> = ({
  name,
  createdAt,
  number,
  price,
  pictures,
  isShowStatus,
  status,
}) => {
  const navigate = useNavigate();
  moment.locale('ru');
  const orderTime = moment(createdAt);
  const orderTimeString = `${orderTime.fromNow()}, ${orderTime.format(
    'HH:mm'
  )}`;
  const remainIngredientsCount = pictures.length - 6;

  const getStatus = (status: string) => {
    switch (status) {
      case 'created':
        return 'Создан';
      case 'pending':
        return 'В процессе';
      case 'done':
        return 'Готов';
    }
  };

  const handleClickOrderContainer = () => {
    navigate(`/feed/${number}`, { state: { background: true } });
  };

  return (
    <div className={styles.order_container} onClick={handleClickOrderContainer}>
      <div className={styles.order_number_container}>
        <span className='text text_type_digits-default'>#{`${number}`}</span>
        <span className='text text_type_main-default text_color_inactive'>
          {orderTimeString}
        </span>
      </div>
      <div>
        <p
          className={`${styles.order_name} text text_type_main-medium`}
          title={name}
        >
          {name}
        </p>
        {isShowStatus && (
          <p className='text text_type_main-default pt-1'>
            {getStatus(status)}
          </p>
        )}
      </div>
      <div className={styles.ingredients_price_container}>
        <div className={styles.ingredients_container}>
          {pictures.map((item, index) => {
            return index <= 5 ? (
              <div
                className={styles.ingredient_image_box}
                key={item + index}
                style={{ left: index * 48 }}
              >
                <img
                  className={styles.ingredient_image}
                  src={item}
                  alt={item}
                  style={{ zIndex: 1000 - index }}
                />
                {index === 5 && remainIngredientsCount > 0 && (
                  <p
                    className='text text_type_main-default'
                    style={{ zIndex: 1001 }}
                  >
                    +{remainIngredientsCount}
                  </p>
                )}
              </div>
            ) : null;
          })}
        </div>
        <div className={styles.price_container}>
          <span
            className={`text ${
              isShowStatus
                ? 'text_type_digits-default'
                : 'text_type_digits-medium'
            } mr-2`}
          >
            {price}
          </span>
          <div className={styles.icon_wrapper}>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
