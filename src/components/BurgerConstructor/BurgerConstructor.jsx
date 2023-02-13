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
import {selectStore} from "../../utils/selectors";
import {useNavigate} from "react-router-dom";
import Spinner from "../common/Spinner";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { constructorItems, ingredients, order } = useSelector(selectStore);
  const { orderNumber, orderRequest } = order;
  const [isShowModal, setIsShowModal] = useState(false);
  const hasBun = !!constructorItems.find(item => item.type === 'bun')
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const totalPrice = useMemo(() => constructorItems.reduce((acc, item) => acc + item.price, 0), [constructorItems]);
  const isShowButtonOrder = hasBun && isAuthChecked;

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
    if (isAuthChecked) {
      dispatch(sendBurgerOrder(constructorItems));
      setIsShowModal(true);
    } else {
      navigate('/login');
    }
  }

  const constructorItemsList = useMemo(() => {
    return constructorItems.map((item, index) => {
      const isFirstItem = index === 0;
      const isLastItem = index === constructorItems.length - 1;

      return <BurgerConstructorItem
        image_mobile={item.image_mobile}
        _id={item._id}
        id={item.id}
        key={item.id}
        price={item.price}
        name={item.name + (isFirstItem ? ' (верх)' : isLastItem ? ' (низ)' : '')}
        isFirstItem={isFirstItem}
        isLastItem={isLastItem}
        hasBun={hasBun}
      />
    })
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
                      extraClass={`${styles.button_order} ${isShowButtonOrder ? '' : styles.button_disabled}`}
                      onClick={hasBun ? onClickButtonOrder : undefined}
              >
                  Оформить заказ
              </Button>
          </div>
        {isShowModal && (
          orderRequest
            ? <Spinner />
            : <Modal header="" onClose={() => setIsShowModal(false)}>
                <OrderDetails orderNumber={orderNumber}/>
              </Modal>)}
      </div>
  );
}

export default BurgerConstructor;
