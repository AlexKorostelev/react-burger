import { useState, useEffect, FormEvent, useRef } from 'react';
import styles from './ForgotPassword.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import InputEmail from '../../components/common/InputEmail';
import { resetUserPassword } from '../../services/actions/user';
import { useAppSelector } from '../../services/hooks/useAppSelector';
import { useAppDispatch } from '../../services/hooks/useAppDispatch';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);

  useEffect(() => {
    if (isAuthChecked) {
      navigate('/');
    } else if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isAuthChecked, navigate]);

  const handleClickButtonRepair = (event: FormEvent) => {
    event.preventDefault();
    email &&
      (dispatch(resetUserPassword(email)) as unknown as Promise<string>).then(
        () => {
          navigate('/reset-password', { state: { from: '/forgot-password' } });
        }
      );
  };

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.input_container}
        onSubmit={handleClickButtonRepair}
      >
        <p className='text text_type_main-medium'>Восстановление пароля</p>
        <InputEmail email={email} setEmail={setEmail} ref={emailInputRef} />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          extraClass='mt-6'
        >
          Восстановить
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

export default ForgotPassword;
