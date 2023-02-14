import styles from './IngredientDetails.module.css';
import CompositionBlock from "./CompositionBlock/CompositionBlock";
import {useSelector} from "react-redux";
import {selectIngredientDetails} from "../../utils/selectors";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

const IngredientDetails = () => {
  const ingredientDetails = useSelector(selectIngredientDetails);
  const {name, calories, proteins, fat, carbohydrates, image_large} = ingredientDetails;

  useEffect(() => {
    window.history.replaceState({}, document.title)
  }, []);

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

export default IngredientDetails;
