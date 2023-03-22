import { useEffect, useRef, useState } from 'react';
import styles from './Profile.module.css';
import InputPassword from '../../components/common/InputPassword';
import InputEmail from '../../components/common/InputEmail';
import InputName from '../../components/common/InputName';
import {
  getUserProfile,
  logoutUser,
  updateUserProfile,
} from '../../services/actions/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../services/hooks/useAppDispatch';
import { useAppSelector } from '../../services/hooks/useAppSelector';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const { email: userEmail, name: userName } = useAppSelector(
    (store) => store.user.user
  );
  const isShowButtons = userName !== name || userEmail !== email;

  useEffect(() => {
    setName(userName);
  }, [userName]);

  useEffect(() => {
    setEmail(userEmail);
  }, [userEmail]);

  useEffect(() => {
    dispatch(getUserProfile());
    nameInputRef && nameInputRef.current && nameInputRef.current.focus();
  }, [dispatch]);

  const handleUserLogoutClick = () => {
    (dispatch(logoutUser()) as unknown as Promise<string>).then(() =>
      navigate('/')
    );
  };

  const handleOrderHistoryClick = () => {
    navigate('/profile/orders');
  };

  const handleButtonSaveClick = () => {
    dispatch(updateUserProfile(name, email));
  };

  const handleButtonCancelClick = () => {
    setName(userName);
    setEmail(userEmail);
  };

  const handleOrderProfileClick = () => {
    navigate('/profile');
  };

  const linkClassName = 'text text_type_main-medium mt-5 mb-5';
  const profileClassName = `${linkClassName} ${
    pathName === '/profile' ? '' : 'text_color_inactive'
  } ${styles.link}`;
  const orderHistoryClassName = `${linkClassName} ${
    pathName === '/profile/orders' ? '' : 'text_color_inactive'
  } ${styles.link}`;
  const logoutClassName = `${linkClassName} ${
    pathName === '/logout' ? '' : 'text_color_inactive'
  } ${styles.link}`;

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.blocks_container}>
          <div className={styles.menu_container}>
            <p className={profileClassName} onClick={handleOrderProfileClick}>
              Профиль
            </p>
            <p
              className={orderHistoryClassName}
              onClick={handleOrderHistoryClick}
            >
              История заказов
            </p>
            <p className={logoutClassName} onClick={handleUserLogoutClick}>
              Выход
            </p>
            <span className='text text_type_main-default text_color_inactive mt-20'>
              В этом разделе вы можете изменить свои персональные данные
            </span>
          </div>
          <form className={styles.input_container}>
            <InputName name={name} setName={setName} ref={nameInputRef} />
            <InputEmail email={email} setEmail={setEmail} />
            <InputPassword
              password={password}
              setPassword={setPassword}
              isShowPassword={isShowPassword}
              setIsShowPassword={setIsShowPassword}
            />
            {isShowButtons && (
              <div className={styles.buttons_container}>
                <Button
                  htmlType='button'
                  type='primary'
                  size='medium'
                  onClick={handleButtonSaveClick}
                >
                  Сохранить
                </Button>
                <Button
                  htmlType='button'
                  type='primary'
                  size='medium'
                  onClick={handleButtonCancelClick}
                >
                  Отмена
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
