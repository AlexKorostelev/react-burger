import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import bodyStyles from "./App.module.css"
import React, {useEffect, useState} from "react";
import {getIngredients} from "../../utils/burger-api";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getIngredients()
      .then(data => setIngredients(data))
      .catch(() => setHasError(true));
  }, []);

  return (
    <>
      <AppHeader />
      {ingredients.success && <main className={bodyStyles.wrapper}>
        <BurgerIngredients cards={ingredients.data} />
        <div className={bodyStyles.separator} />
        <BurgerConstructor cards={ingredients.data} />
      </main>}

      {hasError &&
        <div className={bodyStyles.error}>
          <p className="text text_type_main-default">
            При загрузке данных произошла ошибка.
          </p>
        </div>}
    </>
  )
}

export default App;
