import { forwardRef } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

interface IInputNameProps {
  name: string;
  setName: (value: string) => void;
}

const InputName = forwardRef<HTMLInputElement, IInputNameProps>(
  ({ name, setName }, ref) => {
    return (
      <Input
        ref={ref}
        type={'text'}
        placeholder={'Имя'}
        onChange={(e) => setName(e.target.value)}
        value={name}
        error={false}
        errorText={'Заполните поле'}
        extraClass='mt-6'
      />
    );
  }
);

InputName.displayName = 'InputName';
export default InputName;
