import { forwardRef } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

interface IInputEmailProps {
  email: string;
  setEmail: (value: string) => void;
}

const InputEmail = forwardRef<HTMLInputElement, IInputEmailProps>(
  ({ email, setEmail }, ref) => {
    return (
      <Input
        ref={ref}
        type={'email'}
        placeholder={'E-mail'}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        error={false}
        errorText={'Заполните поле'}
        extraClass='mt-6'
      />
    );
  }
);

InputEmail.displayName = 'InputEmail';
export default InputEmail;
