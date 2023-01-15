import React from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientGroup.module.css';
import Ingredient from '../Ingredient/Ingredient';

const IngredientGroup = ({ groupName, cards }) => {
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
                    image_large={item.image_large}
                    calories={item.calories}
                    proteins={item.proteins}
                    fat={item.fat}
                    carbohydrates={item.carbohydrates}
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
        image_large: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired
    })),
    groupName: PropTypes.string.isRequired
}

export default IngredientGroup;
