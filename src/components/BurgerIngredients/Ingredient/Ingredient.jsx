import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Ingredient.module.css';
import Price from "../../common/Price";
import Modal from "../../Modal/Modal";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import {useDispatch, useSelector} from "react-redux";
import {setIngredientDetails} from "../../../services/actions/ingredientDetails";
import {useDrag} from "react-dnd";

const Ingredient = ({ id }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const { ingredients } = useSelector(store => store.ingredients);
  const ingredient = ingredients.find(item => item._id === id);
  const { image, name, price, count } = ingredient;

  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {id}
  });

  const handlerIngredientClick = () => {
    dispatch(setIngredientDetails(ingredient));
    setIsShowModal(true);
  }

  return (
    <>
      <section className={styles.wrapper} onClick={handlerIngredientClick} ref={dragRef}>
          <div className='ml-4 mr-4'>
              <img src={image} alt={name}/>
          </div>

          <Price price={price} />

          <p className={`text text_type_main-default ${styles.text_name}`}>
              {name}
          </p>

          {count > 0 && <div className={styles.count}>
              <span className="text text_type_digits-default">
                  {count}
              </span>
          </div>}
      </section>

      {isShowModal && (
        <Modal header="Детали ингредиента" onClose={() => setIsShowModal(false)}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Ingredient;
