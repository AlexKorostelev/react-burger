import { FC } from 'react';
import styles from './Ingredient.module.css';
import Price from '../../common/Price';
import { setIngredientDetails } from '../../../services/actions/ingredientDetails';
import { useDrag } from 'react-dnd';
import { selectIngredients } from '../../../utils/selectors';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../services/hooks/useAppSelector';
import { IIngredient } from '../../../pages/IngredientPage/IngredientPage';
import { useAppDispatch } from '../../../services/hooks/useAppDispatch';

interface IIngredientProps {
  id: string;
}

const Ingredient: FC<IIngredientProps> = ({ id }) => {
  const { ingredients } = useAppSelector(selectIngredients);
  const ingredient = ingredients.find((item: IIngredient) => item._id === id);
  const { image, name, price, count } = ingredient;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { id },
  });

  const handlerIngredientClick = () => {
    dispatch(setIngredientDetails(ingredient));
    navigate(`/ingredients/${id}`, { state: { background: true } });
  };

  return (
    <>
      <section
        className={styles.wrapper}
        onClick={handlerIngredientClick}
        ref={dragRef}
        data-cy={`ingredientItem-${id}`}
      >
        <div className='ml-4 mr-4'>
          <img src={image} alt={name} />
        </div>

        <Price price={price} />

        <p className={`text text_type_main-default ${styles.text_name}`}>
          {name}
        </p>

        {count > 0 && (
          <div className={styles.count}>
            <span className='text text_type_digits-default'>{count}</span>
          </div>
        )}
      </section>
    </>
  );
};

export default Ingredient;
