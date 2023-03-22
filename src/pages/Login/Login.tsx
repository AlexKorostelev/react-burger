import { useState, useEffect, useRef, FormEvent } from 'react';
import styles from './Login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import InputEmail from '../../components/common/InputEmail';
import InputPassword from '../../components/common/InputPassword';
import { loginUser } from '../../services/actions/user';
import { useAppDispatch } from '../../services/hooks/useAppDispatch';
import { useAppSelector } from '../../services/hooks/useAppSelector';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const prevPage = location.state ? location.state.from : '/';

  const handleUserLogin = (event: FormEvent) => {
    event.preventDefault();
    (dispatch(loginUser(email, password)) as unknown as Promise<string>).then(
      () => navigate(prevPage)
    );
  };

  useEffect(() => {
    if (isAuthChecked) {
      navigate(prevPage);
    } else if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isAuthChecked, navigate, prevPage]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.input_container} onSubmit={handleUserLogin}>
        <p className='text text_type_main-medium'>Вход</p>
        <InputEmail email={email} setEmail={setEmail} ref={emailInputRef} />
        <InputPassword
          password={password}
          setPassword={setPassword}
          isShowPassword={isShowPassword}
          setIsShowPassword={setIsShowPassword}
        />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          extraClass='mt-6'
        >
          Войти
        </Button>

        <span className='text text_type_main-default text_color_inactive mt-20'>
          Вы - новый пользователь?{' '}
          <Link className={styles.link} to={'/register'}>
            Зарегистрироваться
          </Link>
        </span>
        <span className='text text_type_main-default text_color_inactive mt-4'>
          Забыли пароль?{' '}
          <Link className={styles.link} to={'/forgot-password'}>
            Восстановить пароль
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
