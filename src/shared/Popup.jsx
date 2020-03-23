import React from 'react';
import styles from './Popup.module.scss';

const Popup = props => {
  return (
    <div className={styles.popup}>
      <div className={styles.popup__content}>
        <p className={styles.popup__title}>Czy na pewno tego chcesz?</p>
        <div className={styles.popup__buttons}>
          <button>TAK</button>
          <button>NIE</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
