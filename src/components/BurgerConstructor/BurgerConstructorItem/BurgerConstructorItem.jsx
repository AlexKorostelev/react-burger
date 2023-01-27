import React from 'react';
import PropTypes from 'prop-types';
import styles from "./BurgerConstructorItem.module.css";
import {DeleteIcon, DragIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../common/Price";
import {useDispatch} from "react-redux";
import {moveIngredient, removeIngredient} from "../../../services/actions/constructorItems";
import {decreaseIngredientCount} from "../../../services/actions/ingredients";
import {useDrag, useDrop} from "react-dnd";

const BurgerConstructorItem = ({ id, _id, name, price, image_mobile, isFirstItem, isLastItem }) => {
  const isFirstOrLastItem = isFirstItem || isLastItem;
  const containerClassName = styles.item_container + (isFirstItem ? ` ${styles.bun_top}` : isLastItem ? ` ${styles.bun_bottom}` : '');
  const isEmptyBun = id === '1' || id === '2';
  const dispatch = useDispatch();

  const [, drag] = useDrag({
    type: "constructorItem",
    item: { id },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    }),
    canDrag: () => !isFirstItem && !isLastItem
  });

  const [{ isHover } , dropRef] = useDrop({
    accept: "constructorItem",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(moveIngredient(item.id, id));
    },
    canDrop: () => !isFirstItem && !isLastItem
  });

  const handlerDeleteItem = () => {
    dispatch(removeIngredient(id));
    dispatch(decreaseIngredientCount(_id));
  }

  const isShowBorder = isHover && !isFirstItem && !isLastItem;
  const itemWrapperStyle = isShowBorder ? {border: '1px solid #4c4cff'} : {border: '1px solid transparent'};

  return (
    <section ref={dropRef} style={itemWrapperStyle}>
      <div className={styles.wrapper} ref={drag}>
        <div className={styles.icon_wrapper}>
          {!isFirstOrLastItem && <DragIcon type="primary" />}
        </div>
        <div className={containerClassName} style={isEmptyBun ? {justifyContent: 'center'} : {}}>
          <div className={styles.info_container}>
            {!isEmptyBun && <img src={image_mobile} alt={name} className={styles.image}/>}
            <p className={`text text_type_main-default ${styles.item_name_container}`}>
              {isEmptyBun ? 'Выберите булку' : name}
            </p>
          </div>

          {!isEmptyBun && <div className={styles.cost_container}>
            <Price price={price} />
            <div className={styles.delete_icon} style={isFirstOrLastItem ? {} : {cursor: 'pointer'}}>
              {isFirstOrLastItem
                ? <LockIcon type="secondary" />
                : <DeleteIcon type="primary" onClick={handlerDeleteItem}/>}
            </div>
          </div>}
        </div>
      </div>
    </section>
  );
};

BurgerConstructorItem.propTypes = {
  id: PropTypes.string.isRequired,
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number.isRequired,
  image_mobile: PropTypes.string,
  isFirstItem: PropTypes.bool,
  isLastItem: PropTypes.bool,
  hasBun: PropTypes.bool,
  hasMainOrSauce: PropTypes.bool,
};

export default BurgerConstructorItem;
