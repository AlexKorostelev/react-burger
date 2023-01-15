import styles from './CompositionBlock.module.css';
import PropTypes from "prop-types";

const CompositionBlock = ({ caption, quantity }) => {
  return (
    <div className={styles.container}>
      <p className="text text_type_main-default text_color_inactive">
        {caption}
      </p>
      <p className="text text_type_digits-default text_color_inactive mt-2">{quantity}</p>
    </div>
  );
}

CompositionBlock.propTypes = {
  caption: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
};

export default CompositionBlock;
