import React, {useState, useContext} from 'react';
import styles from "./BurgerConstructor.module.css";
import BurgerConstructorItem from "./BurgerConstructorItem/BurgerConstructorItem";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {IngredientsContext} from "../../context/IngredientsContext";
import { nanoid } from 'nanoid'
import {sendOrder} from "../../utils/burger-api";

const BurgerConstructor = () => {
    const ingredients = useContext(IngredientsContext);
    // Поскольку DND еще не реализован - собираем бургер из всего по одному
    const bun = ingredients.find(item => item.type === 'bun');
    const sauce = ingredients.find(item => item.type === 'sauce');
    const main = ingredients.find(item => item.type === 'main');
    const burger = [bun, sauce, main, bun];
    const totalPrice = burger.reduce((acc, item) => acc + item.price, 0);

    const [order, setOrder] = useState({isShowModal: false, orderId: 0});

    const onClickButtonOrder = () => {
      sendOrder(burger)
        .then(data => setOrder({ isShowModal: data.success, orderId: data.order.number}))
        .catch(() => alert('Произошла ошибка при отправке заказа!'));
    }

    const setBunName = (index) => {
      if (index === 0) {
        return ' (верх)'
      } else if (index === burger.length - 1) {
        return ' (низ)'
      }
      return '';
    }

    return (
        <div className={styles.wrapper}>
            <div className="mt-25" />
            <div className={styles.items_container}>
                {burger.map((item, index) => <BurgerConstructorItem
                    image_mobile={item.image_mobile}
                    price={item.price}
                    name={item.name + setBunName(index)}
                    key={nanoid()}
                    isFirstOrLastItem={index === 0 || index === burger.length - 1}
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
                        onClick={onClickButtonOrder}
                >
                    Оформить заказ
                </Button>
            </div>

          {order.isShowModal && (
            <Modal header="" onClose={() => setOrder({...order, isShowModal: false})}>
              <OrderDetails orderId={order.orderId}/>
            </Modal>)}
        </div>
    );
}

export default BurgerConstructor;
