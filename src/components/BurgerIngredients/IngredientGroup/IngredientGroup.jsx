import React from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientGroup.module.css';
import Ingredient from '../Ingredient/Ingredient';

const IngredientGroup = ({ groupName, cards, onClickCardIngredient }) => {
    return (
        cards.length > 0 &&
        <>
            <p className="text text_type_main-medium mt-10 mb-6">
                {groupName}
            </p>
            <div className={styles.cards_container}>
                {cards.map((item, index) => <Ingredient
                    key={item._id}
                    image={item.image}
                    price={item.price}
                    name={item.name}
                    count={Number(!index)}
                    onClickCardIngredient={() => onClickCardIngredient(item._id)}
                    />
                )}
            </div>
        </>
    );
}

IngredientGroup.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        count: PropTypes.number,
        onClickCardIngredient: PropTypes.func
    })),
    groupName: PropTypes.string.isRequired
}

export default IngredientGroup;
