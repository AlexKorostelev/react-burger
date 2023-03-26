import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';
import NavButton from './NavButton/NavButton';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();

  return (
    <header className={headerStyles.wrapper}>
      <div className={headerStyles.blocks_container}>
        <div className={headerStyles.block_left}>
          <NavButton text='Конструктор' icon='BurgerIcon' linkTo={'/'} />
          <div className={headerStyles.buttons_separator} />
          <NavButton text='Лента заказов' icon='ListIcon' linkTo={'/feed'} />
        </div>
        <div
          className={headerStyles.block_center}
          onClick={() => navigate('/')}
        >
          <Logo />
        </div>
        <div className={headerStyles.block_right}>
          <NavButton
            text='Личный кабинет'
            icon='ProfileIcon'
            linkTo={'/profile'}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
