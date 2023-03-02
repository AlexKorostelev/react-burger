import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './Register.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputPassword from '../../components/common/InputPassword';
import InputEmail from '../../components/common/InputEmail';
import InputName from '../../components/common/InputName';
import { registerUser } from '../../services/actions/user';
import { useAppDispatch } from '../../services/hooks/useAppDispatch';
import { useAppSelector } from '../../services/hooks/useAppSelector';
import { IUserAction } from '../../services/reducers/user';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const prevPage = location.state ? location.state.from.pathname : '/';

  useEffect(() => {
    if (isAuthChecked) {
      navigate(prevPage);
    } else if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isAuthChecked, navigate, prevPage]);

  const handleRegisterUser = (event: FormEvent) => {
    event.preventDefault();
    dispatch(registerUser(name, email, password) as unknown as IUserAction);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.input_container} onSubmit={handleRegisterUser}>
        <p className='text text_type_main-medium'>Регистрация</p>
        <InputName name={name} setName={setName} ref={nameInputRef} />
        <InputEmail email={email} setEmail={setEmail} />
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
          Зарегистрироваться
        </Button>

        <span className='text text_type_main-default text_color_inactive mt-20'>
          Уже зарегистрированы?{' '}
          <Link className={styles.link} to={'/login'}>
            Войти
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
