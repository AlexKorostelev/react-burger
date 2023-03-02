import { useMemo, forwardRef } from 'react';
import styles from './IngredientGroup.module.css';
import Ingredient from '../Ingredient/Ingredient';
import { useSelector } from 'react-redux';
import { tabs } from '../../../utils/constants';
import { selectIngredients } from '../../../utils/selectors';
import { IIngredient } from '../../../pages/IngredientPage/IngredientPage';

export type TGroupName = 'bun' | 'sauce' | 'main';
interface IIngredientGroupProps {
  groupName: TGroupName;
}

const IngredientGroup = forwardRef<HTMLDivElement, IIngredientGroupProps>(
  ({ groupName }, ref) => {
    const { ingredients } = useSelector(selectIngredients);
    const ingredientsGroup = useMemo(
      () => ingredients.filter((item: IIngredient) => item.type === groupName),
      [groupName, ingredients]
    );

    return ingredientsGroup.length > 0 ? (
      <div ref={ref}>
        <p className='text text_type_main-medium mt-10 mb-6'>
          {tabs[groupName]}
        </p>
        <div className={styles.cards_container}>
          {ingredientsGroup.map((item: IIngredient) => (
            <Ingredient key={item._id} id={item._id} />
          ))}
        </div>
      </div>
    ) : null;
  }
);

IngredientGroup.displayName = 'IngredientGroup';
export default IngredientGroup;
