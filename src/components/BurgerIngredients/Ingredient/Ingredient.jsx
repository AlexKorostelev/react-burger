import React from 'react';
import PropTypes from 'prop-types';
import styles from './Ingredient.module.css';
import Price from "../../common/Price";
import {useDispatch, useSelector} from "react-redux";
import {setIngredientDetails} from "../../../services/actions/ingredientDetails";
import {useDrag} from "react-dnd";
import {selectIngredients} from "../../../utils/selectors";
import {useLocation, useNavigate} from "react-router-dom";

const Ingredient = ({ id }) => {
  const { ingredients } = useSelector(selectIngredients);
  const ingredient = ingredients.find(item => item._id === id);
  const { image, name, price, count } = ingredient;

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {id}
  });

  const handlerIngredientClick = () => {
    dispatch(setIngredientDetails(ingredient));
    navigate(`/ingredients/${id}`, {state: {background: true}})
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
    </>
  );
}

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Ingredient;
