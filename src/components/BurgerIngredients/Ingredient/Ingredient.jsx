import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Ingredient.module.css';
import Price from "../../common/Price";
import Modal from "../../Modal/Modal";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";

const Ingredient = (props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const { image, name, price, count = 0, image_large, calories, fat, proteins, carbohydrates } = props;

  return (
    <>
      <section className={styles.wrapper} onClick={() => setIsShowModal(true)}>
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
          <IngredientDetails name={name}
                             image_large={image_large}
                             calories={calories}
                             proteins={proteins}
                             fat={fat}
                             carbohydrates={carbohydrates}/>
        </Modal>
      )}
    </>
  );
}

Ingredient.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
};

export default Ingredient;
