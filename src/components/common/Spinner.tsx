import styles from './Spinner.module.css';
import { FallingLines } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className={styles.spinner_wrapper}>
      <FallingLines color='#f2f2f3' width='100' visible={true} />
    </div>
  );
};

export default Spinner;
