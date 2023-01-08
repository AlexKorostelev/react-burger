import React from 'react';
import styles from "./BurgerConstructor.module.css";
import BurgerConstructorItem from "./BurgerConstructorItem/BurgerConstructorItem";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {mockedDataPropTypes} from "../../utils/types";

const BurgerConstructor = ({ cards }) => {
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
                <CurrencyIcon type="primary"/>
                <Button htmlType="button" type="primary" size="medium" extraClass={styles.button_order}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

BurgerConstructor.propTypes = mockedDataPropTypes;

export default BurgerConstructor;
