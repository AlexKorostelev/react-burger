import styles from './Main.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../utils/selectors';

const Main = () => {
  const { ingredients, ingredientsFailed } = useSelector(selectIngredients);

  return (
    <>
      {ingredients.length > 0 && (
        <main className={styles.wrapper}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <div className={styles.separator} />
            <BurgerConstructor />
          </DndProvider>
        </main>
      )}

      {ingredientsFailed && (
        <div className={styles.error}>
          <p className='text text_type_main-default'>
            При загрузке данных произошла ошибка.
          </p>
        </div>
      )}
    </>
  );
};

export default Main;
