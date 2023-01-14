import React from 'react';
import PropTypes from 'prop-types';
import styles from './Ingredient.module.css';
import Price from "../../common/Price";

const Ingredient = ({ image, name, price, count = 0, onClickCardIngredient }) => {
    return (
        <section className={styles.wrapper} onClick={onClickCardIngredient}>
            <div className='ml-4 mr-4'>
                <img src={image} alt={name}/>
            </div>

            <Price price={price} />

            <p className={`text text_type_main-default ${styles.text_name}`}>
                {name}
            </p>

            {count > 0 && <div className={styles.count}>
                <span className="text text_type_digits-default">
                    {count}
                </span>
            </div>}
        </section>
    );
}

Ingredient.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number,
    onClickCardIngredient: PropTypes.func
};

export default Ingredient;
