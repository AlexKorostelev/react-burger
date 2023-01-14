import React, {useEffect} from "react";
import { createPortal } from 'react-dom';
import ModalHeader from "./ModalHeader/ModalHeader";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import styles from './Modal.module.css';
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, header, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onClose);

    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [onClose]);

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <ModalHeader onClose={onClose} header={header}/>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  header: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.element
};

export default Modal;
