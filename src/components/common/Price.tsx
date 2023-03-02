import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Price.module.css';

interface IPriceProps {
  price: number;
}

const Price: FC<IPriceProps> = ({ price }) => {
  return (
    <div className={`mt-1 mb-1 ${styles.price_container}`}>
      <span className='text text_type_digits-default mr-2'>{price}</span>
      <CurrencyIcon type='primary' />
    </div>
  );
};

export default Price;
