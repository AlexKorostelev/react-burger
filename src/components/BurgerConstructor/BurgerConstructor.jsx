import React, {useState} from 'react';
import styles from "./BurgerConstructor.module.css";
import BurgerConstructorItem from "./BurgerConstructorItem/BurgerConstructorItem";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientsPropTypes} from "../../utils/types";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

const BurgerConstructor = ({ cards }) => {
    const [isShowModal, setIsShowModal] = useState(false);

    // Временно расссчитываем сумму из моковых данных
    const totalPrice = cards ? cards.reduce((acc, item) => acc + item.price, 0) : 0;

    return (
        <div className={styles.wrapper}>
            <div className="mt-25" />
            <div className={styles.items_container}>
                {cards.map((item, index) => <BurgerConstructorItem
                    image_mobile={item.image_mobile}
                    price={item.price}
                    name={item.name}
                    key={item._id}
                    isFirstOrLastItem={index === 0 || index === cards.length - 1}
                />)}
            </div>

            <div className="pt-10" />
            <div className={styles.total_container}>
                <span className="text text_type_digits-medium mr-2">
                    {totalPrice}
                </span>
                <div className={styles.icon_wrapper}>
                  <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button"
                        type="primary"
                        size="medium"
                        extraClass={styles.button_order}
                        onClick={() => setIsShowModal(true)}
                >
                    Оформить заказ
                </Button>
            </div>

          {isShowModal && (
            <Modal header="" onClose={() => setIsShowModal(false)}>
              <OrderDetails orderId="0345367"/>
            </Modal>)}
        </div>
    );
}

BurgerConstructor.propTypes = ingredientsPropTypes;

export default BurgerConstructor;
