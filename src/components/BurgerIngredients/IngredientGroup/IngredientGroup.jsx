import React, {useMemo, forwardRef} from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientGroup.module.css';
import Ingredient from '../Ingredient/Ingredient';
import {useSelector} from "react-redux";
import {tabs} from "../../../utils/constants";

const IngredientGroup = forwardRef(({ groupName }, ref) => {
    const { ingredients } = useSelector(store => store.ingredients);
    const ingredientsGroup = useMemo(() => ingredients.filter(item => item.type === groupName), [groupName, ingredients]);

    return (
      ingredientsGroup.length > 0 &&
        <div ref={ref}>
            <p className="text text_type_main-medium mt-10 mb-6">
                {tabs[groupName]}
            </p>
            <div className={styles.cards_container}>
                {ingredientsGroup.map((item) => <Ingredient
                    key={item._id}
                    id={item._id}
                    />
                )}
            </div>
        </div>
    );
});

IngredientGroup.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
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
