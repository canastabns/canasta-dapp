import React from 'react';

import styles from './style.module.scss';

const BaseSelectNumberContainer = (props) => (
  <div className={`${styles.container} pill bg-lightPrimary`}>
    <div className={styles.rowOne}>
      <div onClick={props.lessTimeHandler} className={`${styles.less} ${styles.addLess}`}>-</div>
      <div className={styles.time}>{props.value}</div>
      <div onClick={props.addTimeHandler} className={`${styles.addLess}`}> +</div>
    </div>
  </div>
);

export default BaseSelectNumberContainer;
