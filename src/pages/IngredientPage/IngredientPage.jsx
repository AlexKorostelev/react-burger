import React, {useEffect} from 'react';
import styles from './IngredientPage.module.css'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import {setIngredientDetails} from "../../services/actions/ingredientDetails";
import {selectIngredientDetails, selectIngredients} from "../../utils/selectors";

const IngredientPage = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(selectIngredients);
  const {name} = useSelector(selectIngredientDetails);
  const {id} = useParams();

  useEffect(() => {
    if (ingredients.length) {
      const ingredient = ingredients.find(item => item._id === id);
      dispatch(setIngredientDetails(ingredient));
    }
  },[dispatch, id, ingredients]);

  return (
    <div className={styles.wrapper}>
      {name && <IngredientDetails />}
    </div>
  );
}

export default IngredientPage;
