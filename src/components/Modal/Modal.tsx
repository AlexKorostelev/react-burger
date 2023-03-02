import { FC, ReactElement, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalHeader from './ModalHeader/ModalHeader';
import ModalOverlay from './ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import { useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById('react-modals');

interface IModalProps {
  children: ReactElement;
  header: string;
  onClose?: () => void;
}

const Modal: FC<IModalProps> = ({ children, header, onClose }) => {
  const navigate = useNavigate();

  const onCloseHandler = useCallback(() => {
    onClose ? onClose() : navigate('/');
  }, [navigate, onClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => event.key === 'Escape' && onCloseHandler(),
    [onCloseHandler]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return modalRoot !== null
    ? createPortal(
        <div className={styles.wrapper}>
          <div
            className={styles.modal_container}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader onClose={onCloseHandler} header={header} />
            {children}
          </div>
          <ModalOverlay onClose={onCloseHandler} />
        </div>,
        modalRoot
      )
    : null;
};

export default Modal;
