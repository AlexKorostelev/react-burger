import { useState, useEffect, useRef, FormEvent } from 'react';
import styles from './ResetPassword.module.css';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputPassword from '../../components/common/InputPassword';
import { resetUserPasswordWithCode } from '../../services/actions/user';
import { useAppDispatch } from '../../services/hooks/useAppDispatch';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isPrevPageForgotPassword = location.state
    ? location.state.from === '/forgot-password'
    : false;

  useEffect(() => {
    if (isPrevPageForgotPassword) {
      passwordInputRef.current && passwordInputRef.current.focus();
    } else {
      navigate('/');
    }
  }, [isPrevPageForgotPassword, navigate]);

  const handleButtonSavePassword = (event: FormEvent) => {
    event.preventDefault();
    dispatch(resetUserPasswordWithCode(password, code, () => navigate('/')));
  };

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.input_container}
        onSubmit={handleButtonSavePassword}
      >
        <p className='text text_type_main-medium'>Восстановление пароля</p>
        <InputPassword
          password={password}
          setPassword={setPassword}
          isShowPassword={isShowPassword}
          setIsShowPassword={setIsShowPassword}
          ref={passwordInputRef}
          placeholder={'Введите новый пароль'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={(e) => setCode(e.target.value)}
          value={code}
          error={false}
          errorText={'Заполните поле'}
          extraClass='mt-6'
        />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          extraClass='mt-6'
        >
          Сохранить
        </Button>

        <span className='text text_type_main-default text_color_inactive mt-20'>
          Вспомнили пароль?{' '}
          <Link className={styles.link} to={'/login'}>
            Войти
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
