import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import bodyStyles from "./App.module.css"
import Modal from "../Modal/Modal";
import React, {useEffect, useState} from "react";
import {baseApiUrl} from "../../utils/constants";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

const App = () => {
  const [cardId, setCardId] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await fetch(`${baseApiUrl}/ingredients`);
        const data = await res.json();
        setIngredients(data);
      } catch(err) {
        setHasError(true);
      }
    }
    getProductData();
  }, []);

  const onOpenModal = (id) => {
    setCardId(id);
  }
  const onCloseModal = () => setCardId(null);
  // Вместо протаскивания всей портянки пропсов на верхний уровень передаем id карточки ингредиента,
  // по которой был клик или "0" - в случае если был клик по кнопке "Оформить заказ"
  const isShowModalIngredients = cardId && cardId.length > 1;
  const isShowModalOrder = cardId === '0';
  // Находим по id карточку ингредиента
  const ingredientInfo = ingredients.data && ingredients.data.find(ingredient => ingredient._id === cardId);

  return (
    <>
      <AppHeader />
      {ingredients.success && <main className={bodyStyles.wrapper}>
        <BurgerIngredients cards={ingredients.data} onClickCardIngredient={onOpenModal}/>
        <div className={bodyStyles.separator} />
        <BurgerConstructor cards={ingredients.data} onClickButtonOrder={onOpenModal}/>
      </main>}

      {hasError &&
        <div className={bodyStyles.error}>
          <p className="text text_type_main-default">
            При загрузке данных произошла ошибка.
          </p>
        </div>}

      {isShowModalIngredients && (
        <Modal header="Детали ингредиента" onClose={onCloseModal}>
          <IngredientDetails name={ingredientInfo.name}
                             image_large={ingredientInfo.image_large}
                             calories={ingredientInfo.calories}
                             proteins={ingredientInfo.proteins}
                             fat={ingredientInfo.fat}
                             carbohydrates={ingredientInfo.carbohydrates}/>
        </Modal>)}

      {isShowModalOrder && (
        <Modal header="" onClose={onCloseModal}>
          <OrderDetails orderId="034536"/>
        </Modal>)}
    </>
  )
}

export default App;
