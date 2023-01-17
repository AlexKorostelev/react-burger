import React, {useContext, useEffect, useRef} from 'react';
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
    const refBun = useRef(null);
    const refSauce = useRef(null);
    const refMain = useRef(null);

  useEffect(() => {
    switch (activeTab) {
      case tabs.bun:
        refBun.current && refBun.current.scrollIntoView({behavior: "smooth"});
        break;
      case tabs.sauce:
        refSauce.current && refSauce.current.scrollIntoView({behavior: "smooth"});
        break;
      case tabs.main:
        refMain.current && refMain.current.scrollIntoView({behavior: "smooth"});
        break;
      default: break;
    }
  }, [activeTab]);

  return (
        <div className={styles.wrapper}>
           <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <TabContainer activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className={styles.cards_wrapper}>
                <IngredientGroup ingredients={bun} groupName={tabs.bun} ref={refBun} />
                <IngredientGroup ingredients={sauce} groupName={tabs.sauce} ref={refSauce} />
                <IngredientGroup ingredients={main} groupName={tabs.main} ref={refMain} />
            </div>
        </div>
    );
}

export default BurgerIngredients;
