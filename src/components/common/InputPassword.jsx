import React, {forwardRef} from 'react';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const InputPassword = forwardRef(({password, setPassword, isShowPassword, setIsShowPassword, placeholder="Пароль"}, ref) => {
  return (
    <Input
      type={isShowPassword ? 'text' : 'password'}
      icon={isShowPassword ? 'HideIcon' : 'ShowIcon'}
      onIconClick={() => setIsShowPassword(!isShowPassword)}
      placeholder={placeholder}
      onChange={e => setPassword(e.target.value)}
      value={password}
      error={false}
      ref={ref}
      errorText={'Заполните поле'}
      extraClass="mt-6"
    />
  );
});

InputPassword.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default InputPassword;
