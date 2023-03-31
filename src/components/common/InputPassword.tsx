import { forwardRef } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

interface IInputPasswordProps {
  password: string;
  setPassword: (value: string) => void;
  isShowPassword: boolean;
  setIsShowPassword: (value: boolean) => void;
  placeholder?: string;
}

const InputPassword = forwardRef<HTMLInputElement, IInputPasswordProps>(
  (
    {
      password,
      setPassword,
      isShowPassword,
      setIsShowPassword,
      placeholder = 'Пароль',
    },
    ref
  ) => {
    return (
      <Input
        type={isShowPassword ? 'text' : 'password'}
        icon={isShowPassword ? 'HideIcon' : 'ShowIcon'}
        onIconClick={() => setIsShowPassword(!isShowPassword)}
        placeholder={placeholder}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        error={false}
        ref={ref}
        errorText={'Заполните поле'}
        extraClass='mt-6'
        data-cy='input-password'
      />
    );
  }
);

InputPassword.displayName = 'InputPassword';
export default InputPassword;
