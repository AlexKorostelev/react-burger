import React, {forwardRef} from 'react';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const InputEmail = forwardRef(({email, setEmail}, ref) => {
  return (
    <Input
      ref={ref}
      type={'email'}
      placeholder={'E-mail'}
      onChange={e => setEmail(e.target.value)}
      value={email}
      error={false}
      errorText={'Заполните поле'}
      extraClass="mt-6"
    />
  );
})

InputEmail.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  icon: PropTypes.string
}

export default InputEmail;
