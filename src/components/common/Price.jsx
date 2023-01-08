import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Price.module.css';
import PropTypes from "prop-types";

const Price = ({ price }) => {
    return (
        <div className={`mt-1 mb-1 ${styles.price_container}`}>
            <span className="text text_type_digits-default mr-2">
                {price}
            </span>
            <CurrencyIcon type="primary" />
        </div>
    );
};

Price.propTypes = {
    price: PropTypes.number.isRequired
};

export default Price;
