import React, {useState, useEffect} from 'react';
import styles from './ForgotPassword.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import InputEmail from "../../components/common/InputEmail";
import {useDispatch, useSelector} from "react-redux";
import {resetUserPassword} from "../../services/actions/user";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const emailInputRef = React.useRef(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);

  useEffect(() => {
    isAuthChecked
      ? navigate('/')
      : emailInputRef.current.focus();
  }, [isAuthChecked, navigate]);

  const handleClickButtonRepair = (event) => {
    event.preventDefault();
    email && dispatch(resetUserPassword(email)).then(() => {
      navigate('/reset-password', { state: { from: '/forgot-password' }})
    });
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.input_container} onSubmit={handleClickButtonRepair}>
        <p className="text text_type_main-medium">
          Восстановление пароля
        </p>
        <InputEmail email={email} setEmail={setEmail} ref={emailInputRef}/>
        <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
          Восстановить
        </Button>

        <span className="text text_type_main-default text_color_inactive mt-20">
          Вспомнили пароль? <Link className={styles.link} to={'/login'}>Войти</Link>
        </span>
      </form>
    </div>
  );
}

export default ForgotPassword;
