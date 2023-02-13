import React from 'react';
import styles from "./Spinner.module.css";
import {FallingLines} from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className={styles.spinner_wrapper}>
      <FallingLines
        color="#f2f2f3"
        width="100"
        visible={true}
        ariaLabel='falling-lines-loading'
      />
    </div>
  );
}

export default Spinner;
