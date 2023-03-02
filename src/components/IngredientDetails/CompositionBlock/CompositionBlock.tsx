import styles from './CompositionBlock.module.css';
import { FC } from 'react';

interface ICompositionBlockProps {
  caption: string;
  quantity: number;
}

const CompositionBlock: FC<ICompositionBlockProps> = ({
  caption,
  quantity,
}) => {
  return (
    <div className={styles.container}>
      <p className='text text_type_main-default text_color_inactive'>
        {caption}
      </p>
      <p className='text text_type_digits-default text_color_inactive mt-2'>
        {quantity}
      </p>
    </div>
  );
};

export default CompositionBlock;
