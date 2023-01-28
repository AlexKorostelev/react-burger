import styles from './OrderDetails.module.css';
import {CheckMarkIcon, CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const OrderDetails = ({orderNumber}) => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-large">
        {orderNumber}
      </p>
      <p className="text text_type_main-medium mt-8 mb-15">
        Идентификатор заказа
      </p>
      <div className={styles.icon_wrapper}>
        {orderNumber ? <CheckMarkIcon type="primary" /> : <CloseIcon type="error"/>}
      </div>
      <p className="text text_type_main-default mt-15 mb-2">
        {orderNumber ? 'Ваш заказ начали готовить' : 'Произошла ошибка!'}
      </p>
      <p className="text text_type_main-default text_color_inactive mb-25">
        {orderNumber
          ? 'Дождитесь готовности на орбитальной станции'
          : 'Наши специалисты уже работают над устранением ошибки'
        }
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired
};

export default OrderDetails;
