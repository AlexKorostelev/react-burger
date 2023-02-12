import React, {useCallback, useEffect} from "react";
import { createPortal } from 'react-dom';
import ModalHeader from "./ModalHeader/ModalHeader";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import styles from './Modal.module.css';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, header, onClose }) => {
  const navigate = useNavigate();

  const onCloseHandler = useCallback(() => {
    onClose ? onClose() : navigate('/');
  },[navigate, onClose])

  const handleKeyDown = useCallback(
    (event) => (event.key === 'Escape') && onCloseHandler(),
    [onCloseHandler]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        <ModalHeader onClose={onCloseHandler} header={header}/>
        {children}
      </div>
      <ModalOverlay onClose={onCloseHandler} />
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  header: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.element
};

export default Modal;
