import React, {useMemo, useState} from 'react';
import styles from "./BurgerConstructor.module.css";
import BurgerConstructorItem from "./BurgerConstructorItem/BurgerConstructorItem";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useDispatch, useSelector} from "react-redux";
import {sendBurgerOrder} from "../../services/actions/order";
import {useDrop} from "react-dnd";
import {addIngredient} from "../../services/actions/constructorItems";
import {increaseIngredientCount} from "../../services/actions/ingredients";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { constructorItems, ingredients } = useSelector(store => store);
  const { orderNumber, orderRequest } = useSelector(store => store.order);
  const [isShowModal, setIsShowModal] = useState(false);
  const hasBun = !!constructorItems.find(item => item.type === 'bun')

  const totalPrice = useMemo(() => constructorItems.reduce((acc, item) => acc + item.price, 0), [constructorItems]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(dragItem) {
      const ingredient = ingredients.ingredients.find(item => item._id === dragItem.id);
      dispatch(addIngredient(ingredient));
      dispatch(increaseIngredientCount(ingredient._id));
    },
  });

  const onClickButtonOrder = () => {
    dispatch(sendBurgerOrder(constructorItems));
    setIsShowModal(true);
  }

  const constructorItemsList = useMemo(() => {
    return constructorItems.map((item, index) => <BurgerConstructorItem
      image_mobile={item.image_mobile}
      _id={item._id}
      id={item.id}
      key={item.id}
      price={item.price}
      name={item.name}
      isFirstItem={index === 0}
      isLastItem={index === constructorItems.length - 1}
      hasBun={hasBun}
    />)
  },[constructorItems, hasBun])

  const itemsContainerStyle = isHover ? {border: '1px solid #4c4cff'} : {};

  return (
      <div className={styles.wrapper}>
          <div className="mt-25" />
          <div className={styles.items_container} style={itemsContainerStyle} ref={dropTarget}>
              {constructorItemsList}
          </div>

          <div className="pt-10" />
          <div className={styles.total_container}>
              <span className="text text_type_digits-medium mr-2">
                  {totalPrice}
              </span>
              <div className={styles.icon_wrapper}>
                <CurrencyIcon type="primary"/>
              </div>
              <Button htmlType="button"
                      type="primary"
                      size="medium"
                      extraClass={`${styles.button_order} ${hasBun ? '' : styles.button_disabled}`}
                      onClick={hasBun ? onClickButtonOrder : undefined}
              >
                  Оформить заказ
              </Button>
          </div>

        {isShowModal && !orderRequest && (
          <Modal header="" onClose={() => setIsShowModal(false)}>
            <OrderDetails orderNumber={orderNumber}/>
          </Modal>)}
      </div>
  );
}

export default BurgerConstructor;
