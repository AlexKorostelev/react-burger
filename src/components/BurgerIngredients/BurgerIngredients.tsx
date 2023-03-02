import { useState, useEffect, useRef, Ref } from 'react';
import styles from './BurgerIngredients.module.css';
import IngredientGroup, { TGroupName } from './IngredientGroup/IngredientGroup';
import { tabs } from '../../utils/constants';
import TabContainer from './TabContainer/TabContainer';
import { useInView } from 'react-intersection-observer';

const BurgerIngredients = () => {
  const { ref: refBunInView, inView: bunInView } = useInView({
    threshold: 0.5,
  });
  const { ref: refSauceInView, inView: sauceInView } = useInView({
    threshold: 0.5,
  });
  const { ref: refMainInView, inView: mainInView } = useInView({
    threshold: 0.5,
  });

  const [activeTab, setActiveTab] = useState(tabs.bun);
  const refBun = useRef<null | HTMLDivElement>(null);
  const refSauce = useRef<null | HTMLDivElement>(null);
  const refMain = useRef<null | HTMLDivElement>(null);

  const [isTimerActive, setIsTimerActive] = useState(false);
  const refTimer = useRef<ReturnType<typeof setTimeout>>();

  const setTimer = () => {
    setIsTimerActive(true);
    refTimer.current = setTimeout(() => {
      setIsTimerActive(false);
    }, 500);
  };

  useEffect(() => {
    if (!isTimerActive) {
      if (bunInView) {
        setActiveTab(tabs.bun);
      } else if (sauceInView) {
        setActiveTab(tabs.sauce);
      } else if (mainInView) {
        setActiveTab(tabs.main);
      }
    }
  }, [bunInView, sauceInView, mainInView, isTimerActive]);

  useEffect(() => {
    // Небольшое пояснение: таймер введен для того, чтобы 2 useEffect не перебивали друг друга.
    // Если не использовать таймер - то при переключении между крайними табами (булки и начинки)
    // активная становится средняя (т.к. срабатывает scrollIntoView, в область просмотра попадает
    // средняя таба и останавливается). Как вариант - добавил таймер в момент клика по табе,
    // запрещающий установку табов на время скролла.
    setTimer();
    switch (activeTab) {
      case tabs.bun:
        refBun.current && refBun.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case tabs.sauce:
        refSauce.current &&
          refSauce.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case tabs.main:
        refMain.current &&
          refMain.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  }, [activeTab]);

  const ingredientGroupWithRef = (
    ref: Ref<HTMLDivElement>,
    forwardRef: Ref<HTMLDivElement>,
    groupName: TGroupName
  ) => {
    return (
      <div ref={ref}>
        <IngredientGroup groupName={groupName} ref={forwardRef} />
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <p className='text text_type_main-large mt-10 mb-5'>Соберите бургер</p>
      <TabContainer activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.cards_wrapper}>
        {ingredientGroupWithRef(refBunInView, refBun, 'bun')}
        {ingredientGroupWithRef(refSauceInView, refSauce, 'sauce')}
        {ingredientGroupWithRef(refMainInView, refMain, 'main')}
      </div>
    </div>
  );
};

export default BurgerIngredients;
