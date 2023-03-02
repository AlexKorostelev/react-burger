import { FC } from 'react';
import styles from './ModalOverlay.module.css';

interface IModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
  return <div className={styles.container} onClick={onClose} />;
};

export default ModalOverlay;
