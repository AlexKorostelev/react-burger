import React from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientGroup.module.css';
import Ingredient from '../Ingredient/Ingredient';

const IngredientGroup = ({ groupName, cards }) => {
    // Генерим рандомные данные для примера отображения блока
    const cardsWithCount = cards.map((item, index) => ({...item, count: Math.floor(Math.random() * 3)}));

    return (
        cardsWithCount.length > 0 &&
        <>
            <p className="text text_type_main-medium mt-10 mb-6">
                {groupName}
            </p>
            <div className={styles.cards_container}>
                {cardsWithCount.map(item => <Ingredient
                    key={item._id}
                    image={item.image}
                    price={item.price}
                    name={item.name}
                    count={item.count}
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
    })),
    groupName: PropTypes.string.isRequired
}

export default IngredientGroup;
