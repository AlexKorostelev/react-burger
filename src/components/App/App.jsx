import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import bodyStyles from "./App.module.css"
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBurgerIngredients} from "../../services/actions/ingredients";

const App = () => {
  const dispatch = useDispatch();
  const { ingredients, ingredientsFailed } = useSelector(store => store.ingredients);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {ingredients.length > 0 && <main className={bodyStyles.wrapper}>
        <BurgerIngredients />
        <div className={bodyStyles.separator} />
        <BurgerConstructor />
      </main>}

      {ingredientsFailed &&
        <div className={bodyStyles.error}>
          <p className="text text_type_main-default">
            При загрузке данных произошла ошибка.
          </p>
        </div>}
    </>
  )
}

export default App;
