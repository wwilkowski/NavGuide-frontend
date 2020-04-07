import React from 'react';
import styles from './ProfileMenu.module.scss';
import UserIcon from '../../assets/icons/user.png';
import ListIcon from '../../assets/icons/list.png';
import HistoryIcon from '../../assets/icons/history.png';
import { useTranslation } from 'react-i18next';

enum Scene {
  profile,
  history,
  activeOffers,
}

interface Props {
  setScene: (scene: Scene) => void;
}

const ProfileMenu = (props: Props) => {
  const { t } = useTranslation();
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__menuList}>
        <li className={styles.nav__menuItem} onClick={() => props.setScene(Scene.profile)}>
          <div className={styles.nav__case}>
            <img className={styles.nav__icon} src={UserIcon} alt='' />
            <p className={styles.nav__p}>{t('Profile')}</p>
          </div>
        </li>
        <li className={styles.nav__menuItem} onClick={() => props.setScene(Scene.activeOffers)}>
          <div className={styles.nav__case}>
            <img className={styles.nav__icon} src={ListIcon} alt='' />
            <p className={styles.nav__p}>{t('Active offers')}</p>
          </div>
        </li>
        <li className={styles.nav__menuItem} onClick={() => props.setScene(Scene.history)}>
          <div className={styles.nav__case}>
            <img className={styles.nav__icon} src={HistoryIcon} alt='' />
            <p className={styles.nav__p}>{t('History')}</p>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileMenu;
