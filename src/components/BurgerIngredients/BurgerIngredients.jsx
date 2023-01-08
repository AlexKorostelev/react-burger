import React from 'react';
import styles from './BurgerIngredients.module.css';
import IngredientGroup from "./IngredientGroup/IngredientGroup";
import {tabs} from "../../utils/constants";
import TabContainer from "./TabContainer/TabContainer";
import {mockedDataPropTypes} from "../../utils/types";

const BurgerIngredients = ({cards}) => {
    const [activeTab, setActiveTab] = React.useState(tabs.bun)
    const cardsBun = cards.filter(item => item.type === 'bun');
    const cardsSauce = cards.filter(item => item.type === 'sauce');
    const cardsMain = cards.filter(item => item.type === 'main');

    return (
        <div className={styles.wrapper}>
           <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <TabContainer activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className={styles.cards_wrapper}>
                <IngredientGroup cards={cardsBun} groupName={tabs.bun}/>
                <IngredientGroup cards={cardsSauce} groupName={tabs.sauce}/>
                <IngredientGroup cards={cardsMain} groupName={tabs.main}/>
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = mockedDataPropTypes;

export default BurgerIngredients;
