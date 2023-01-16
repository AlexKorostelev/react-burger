import styles from './OrderDetails.module.css';
import PropTypes from "prop-types";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = ({ orderId }) => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-large">
        {orderId}
      </p>
      <p className="text text_type_main-medium mt-8 mb-15">
        Идентификатор заказа
      </p>
      <div className={styles.icon_wrapper}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-25">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired
};

export default OrderDetails;
