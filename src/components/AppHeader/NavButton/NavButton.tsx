import styles from './NavButton.module.css';
import { Link, useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';

interface INavButtonProps {
  text: string;
  icon: 'BurgerIcon' | 'ListIcon' | 'ProfileIcon';
  linkTo: string;
}

const NavButton: FC<INavButtonProps> = ({ text, icon, linkTo }) => {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const textClassName = `text text_type_main-default ml-2 ${
    isActive ? '' : 'text_color_inactive'
  }`;

  useEffect(() => {
    switch (pathname) {
      case '/':
        setIsActive(linkTo === '/');
        break;
      case '/order':
        setIsActive(linkTo === '/order');
        break;
      case '/profile':
        setIsActive(linkTo === '/profile');
        break;
      case '/profile/orders':
        setIsActive(linkTo === '/profile');
        break;
      default:
        setIsActive(false);
    }
  }, [linkTo, pathname]);

  const getIcon = () => {
    switch (icon) {
      case 'BurgerIcon':
        return <BurgerIcon type={isActive ? 'primary' : 'secondary'} />;
      case 'ListIcon':
        return <ListIcon type={isActive ? 'primary' : 'secondary'} />;
      case 'ProfileIcon':
        return <ProfileIcon type={isActive ? 'primary' : 'secondary'} />;
      default:
        return null;
    }
  };

  return (
    <Link to={linkTo} className={isActive ? styles.link_active : styles.link}>
      <nav className={`ml-5 mr-5 mb-4 mt-4 ${styles.wrapper}`}>
        {getIcon()}
        <span className={textClassName}>{text}</span>
      </nav>
    </Link>
  );
};

export default NavButton;
