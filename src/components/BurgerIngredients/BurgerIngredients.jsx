import React, {useContext} from 'react';
import styles from './BurgerIngredients.module.css';
import IngredientGroup from "./IngredientGroup/IngredientGroup";
import {tabs} from "../../utils/constants";
import TabContainer from "./TabContainer/TabContainer";
import {IngredientsContext} from "../../context/IngredientsContext";

const BurgerIngredients = () => {
    const ingredients = useContext(IngredientsContext);
    const [activeTab, setActiveTab] = React.useState(tabs.bun)
    const bun = ingredients.filter(item => item.type === 'bun');
    const sauce = ingredients.filter(item => item.type === 'sauce');
    const main = ingredients.filter(item => item.type === 'main');

    return (
        <div className={styles.wrapper}>
           <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <TabContainer activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className={styles.cards_wrapper}>
                <IngredientGroup ingredients={bun} groupName={tabs.bun} />
                <IngredientGroup ingredients={sauce} groupName={tabs.sauce} />
                <IngredientGroup ingredients={main} groupName={tabs.main} />
            </div>
        </div>
    );
}

export default BurgerIngredients;
