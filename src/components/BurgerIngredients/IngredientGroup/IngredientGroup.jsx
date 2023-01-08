import React from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientGroup.module.css';
import Ingredient from "../Ingredient/Ingredient";
import {tabs} from "../../../utils/constants";

const IngredientGroup = ({ groupName, cards }) => {
    const itemType = Object.keys(tabs).find(key => tabs[key] === groupName);
    const cardsGroup = cards.filter(item => item.type === itemType)
        // Генерим рандомные данные для примера отображения блока
        .map((item, index) => ({...item, count: Math.floor(Math.random() * 3)}));

    return (
        cardsGroup.length > 0 &&
        <>
            <p className="text text_type_main-medium mt-10 mb-6">{groupName}</p>
            <div className={styles.cards_container}>
                {cardsGroup.map(item => <Ingredient
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
