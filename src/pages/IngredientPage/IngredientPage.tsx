import { useEffect } from 'react';
import styles from './IngredientPage.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { setIngredientDetails } from '../../services/actions/ingredientDetails';
import {
  selectIngredientDetails,
  selectIngredients,
} from '../../utils/selectors';
import { useAppDispatch } from '../../services/hooks/useAppDispatch';
import { IOrderAction } from '../../services/reducers/order';

export interface IIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
}

const IngredientPage = () => {
  const dispatch = useAppDispatch();
  const { ingredients } = useSelector(selectIngredients);
  const { name } = useSelector(selectIngredientDetails);
  const { id } = useParams();

  useEffect(() => {
    if (ingredients.length) {
      const ingredient = ingredients.find(
        (item: IIngredient) => item._id === id
      );
      dispatch(setIngredientDetails(ingredient) as unknown as IOrderAction);
    }
  }, [dispatch, id, ingredients]);

  return <div className={styles.wrapper}>{name && <IngredientDetails />}</div>;
};

export default IngredientPage;
