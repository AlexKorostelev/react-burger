import React, {forwardRef} from 'react';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const InputName = forwardRef(({name, setName}, ref) => {
  return (
    <Input
      ref={ref}
      type={'text'}
      placeholder={'Имя'}
      onChange={e => setName(e.target.value)}
      value={name}
      error={false}
      errorText={'Заполните поле'}
      extraClass="mt-6"
    />
  );
})

InputName.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  icon: PropTypes.string
}

export default InputName;
