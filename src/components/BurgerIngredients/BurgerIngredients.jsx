import React from 'react';
import styles from './BurgerIngredients.module.css';
import IngredientGroup from "./IngredientGroup/IngredientGroup";
import {tabs} from "../../utils/constants";
import TabContainer from "./TabContainer/TabContainer";
import PropTypes from "prop-types";


const BurgerIngredients = ({cards}) => {
    const [activeTab, setActiveTab] = React.useState(tabs.bun)

    return (
        <div className={styles.wrapper}>
           <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <TabContainer activeTab={activeTab} setActiveTab={setActiveTab}/>
            <IngredientGroup cards={cards} groupName={activeTab}/>
        </div>
    );
}

BurgerIngredients.propTypes = {
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

export default BurgerIngredients;
