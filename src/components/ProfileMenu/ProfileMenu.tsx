import React from 'react';
import styles from './ProfileMenu.module.scss';
import UserIcon from '../../assets/icons/user.png';
import ListIcon from '../../assets/icons/list.png';
import HistoryIcon from '../../assets/icons/history.png';

enum Scene {
  profile,
  history,
  activeOffers
}

interface Props {
  setScene: (scene: Scene) => void;
}

const ProfileMenu = (props: Props) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__menuList}>
        <li className={styles.nav__menuItem} onClick={() => props.setScene(Scene.profile)}>
          <div className={styles.nav__case}>
            <img className={styles.nav__icon} src={UserIcon} alt='' />
            <p className={styles.nav__p}>Profile</p>
          </div>
        </li>
        <li className={styles.nav__menuItem} onClick={() => props.setScene(Scene.activeOffers)}>
          <div className={styles.nav__case}>
            <img className={styles.nav__icon} src={ListIcon} alt='' />
            <p className={styles.nav__p}>Active offers</p>
          </div>
        </li>
        <li className={styles.nav__menuItem} onClick={() => props.setScene(Scene.history)}>
          <div className={styles.nav__case}>
            <img className={styles.nav__icon} src={HistoryIcon} alt='' />
            <p className={styles.nav__p}>History</p>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileMenu;
