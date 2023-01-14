import styles from './IngredientDetails.module.css';
import PropTypes from "prop-types";
import CompositionBlock from "./CompositionBlock/CompositionBlock";

const IngredientDetails = (props) => {
  const {name, calories, proteins, fat, carbohydrates, image_large} = props;

  return (
    <div className={styles.wrapper}>
      <img src={image_large} alt={name} width={480} height={240}/>
      <p className="text text_type_main-medium">{name}</p>
      <div className={styles.composition_blocks}>
        <CompositionBlock caption="Калории,ккал" quantity={calories}/>
        <CompositionBlock caption="Белки, г" quantity={proteins}/>
        <CompositionBlock caption="Жиры, г" quantity={fat}/>
        <CompositionBlock caption="Углеводы, г" quantity={carbohydrates}/>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  image_large: PropTypes.string.isRequired
};

export default IngredientDetails;
