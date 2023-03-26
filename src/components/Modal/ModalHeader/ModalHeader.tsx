import { FC } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ModalHeader.module.css';

interface IModalHeaderProps {
  header?: string;
  onClose: () => void;
}

const ModalHeader: FC<IModalHeaderProps> = ({ header, onClose }) => {
  return (
    <div
      className={styles.wrapper}
      style={{ height: header ? '100px' : '60px' }}
    >
      <div className={styles.container}>
        <span className={'text text_type_main-large'}>{header || ''}</span>
        <div className={styles.icon_container} onClick={onClose}>
          <CloseIcon type='primary' />
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
