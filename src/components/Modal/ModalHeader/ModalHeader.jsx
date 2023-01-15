import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ModalHeader.module.css'
import PropTypes from "prop-types";

const ModalHeader = ({ header, onClose }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className="text text_type_main-large">
            {header}
        </span>
        <div className={styles.icon_container} onClick={onClose}>
          <CloseIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

ModalHeader.propTypes = {
  header: PropTypes.string,
  onClose: PropTypes.func
};

export default ModalHeader;
