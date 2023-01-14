import React from 'react';
import styles from "./BurgerConstructor.module.css";
import BurgerConstructorItem from "./BurgerConstructorItem/BurgerConstructorItem";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const BurgerConstructor = ({ cards }) => {
    // Временно расссчитываем сумму из моковых данных
    const totalPrice = cards ? cards.reduce((acc, item) => acc + item.price, 0) : 0;

    return (
        <div className={styles.wrapper}>
            <div className="mt-25" />
            <div className={styles.items_container}>
                {cards.map(item => <BurgerConstructorItem image_mobile={item.image_mobile} price={item.price} name={item.name} key={item._id}/>)}
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

BurgerConstructor.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number,
    }))
}

export default BurgerConstructor;
