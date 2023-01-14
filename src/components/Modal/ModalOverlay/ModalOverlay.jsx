import styles from './ModalOverlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose, children }) => {
    return (
        <div className={styles.container} onClick={onClose}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element
};

export default ModalOverlay;
