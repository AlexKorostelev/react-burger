import React, {useMemo, useState} from 'react';
import styles from "./BurgerConstructor.module.css";
import BurgerConstructorItem from "./BurgerConstructorItem/BurgerConstructorItem";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useDispatch, useSelector} from "react-redux";
import {sendBurgerOrder} from "../../services/actions/order";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { constructorItems } = useSelector(store => store);
  const { orderNumber } = useSelector(store => store.order);
  const [isShowModal, setIsShowModal] = useState(false);
  const totalPrice = constructorItems.reduce((acc, item) => acc + item.price, 0);
  const hasBun = !!constructorItems.find(item => item.type === 'bun')

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

  return (
      <div className={styles.wrapper}>
          <div className="mt-25" />
          <div className={styles.items_container}>
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

        {isShowModal && orderNumber!==0 && (
          <Modal header="" onClose={() => setIsShowModal(false)}>
            <OrderDetails orderNumber={orderNumber}/>
          </Modal>)}
      </div>
  );
}

export default BurgerConstructor;
