import React from 'react';
import styles from './BurgerIngredients.module.css';
import IngredientGroup from "./IngredientGroup/IngredientGroup";
import {tabs} from "../../utils/constants";
import TabContainer from "./TabContainer/TabContainer";
import {ingredientsPropTypes} from "../../utils/types";
import PropTypes from "prop-types";

const BurgerIngredients = ({ cards, onClickCardIngredient }) => {
    const [activeTab, setActiveTab] = React.useState(tabs.bun)
    const cardsBun = cards.filter(item => item.type === 'bun');
    const cardsSauce = cards.filter(item => item.type === 'sauce');
    const cardsMain = cards.filter(item => item.type === 'main');

    return (
        <div className={styles.wrapper}>
           <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <TabContainer activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className={styles.cards_wrapper}>
                <IngredientGroup cards={cardsBun} groupName={tabs.bun} onClickCardIngredient={onClickCardIngredient} />
                <IngredientGroup cards={cardsSauce} groupName={tabs.sauce} onClickCardIngredient={onClickCardIngredient} />
                <IngredientGroup cards={cardsMain} groupName={tabs.main} onClickCardIngredient={onClickCardIngredient} />
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = { ...ingredientsPropTypes, onClickCardIngredient: PropTypes.func };

export default BurgerIngredients;
