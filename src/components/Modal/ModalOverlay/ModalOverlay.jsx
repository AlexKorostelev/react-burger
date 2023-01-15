import styles from './ModalOverlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
    return (
        <div className={styles.container} onClick={onClose} />
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func
};

export default ModalOverlay;
