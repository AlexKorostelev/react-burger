import React from 'react';
import PropTypes from 'prop-types';
import styles from "./BurgerConstructorItem.module.css";
import {DeleteIcon, DragIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../common/Price";

const BurgerConstructorItem = ({ name, price, image_mobile, isFirstOrLastItem }) => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.icon_wrapper}>
                {!isFirstOrLastItem && <DragIcon type="primary" />}
            </div>
            <div className={styles.item_container}>
                <div className={styles.info_container}>
                    <img src={image_mobile} alt={name} className={styles.image}/>
                    <p className={`text text_type_main-default ${styles.item_name_container}`}>
                        {name}
                    </p>
                </div>

                <div className={styles.cost_container}>
                    <Price price={price} />
                    <div className={styles.delete_icon}>
                        {isFirstOrLastItem ? <LockIcon type="secondary" /> : <DeleteIcon type="primary" />}
                    </div>
                </div>
            </div>
        </section>
    );
}

BurgerConstructorItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image_mobile: PropTypes.string.isRequired,
    isFirstOrLastItem: PropTypes.bool
};

export default BurgerConstructorItem;
