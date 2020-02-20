import React from 'react';
import { IListGuideRequestProps } from './types';
import * as types from '../../containers/AdminPanel/types';
import { useTranslation } from 'react-i18next';
import styles from './ListGuideRequests.module.scss';

//naprawic doswiadczenie

const ListGuideRequests = (props: IListGuideRequestProps) => {
  const { guideRequests } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.requestsContainer}>
      {guideRequests.map((req: types.IGuideRequest, index: number) => (
        <div className={styles.request} key={req.id}>
          <div className={styles.request__content}>
            <div className={styles.row}>
              <b>{t('ID')}:</b> {req.id}
            </div>
            <div className={styles.row}>
              <b>{t('Created at')}:</b> {req.date}
            </div>
            <div className={styles.row}>
              <b>{t('Name and surname')}:</b> Krzysztof Sieg
            </div>
            <div className={styles.row}>
              <b>{t('Experience')}:</b> ****
            </div>
            <div className={styles.row}>
              <b>{t('Languages')}:</b> {req.languages.map((lng: string) => `${lng} `)}
            </div>
            <div className={styles.description}>{req.description}</div>
          </div>
          <div className={styles.request__menu}></div>
        </div>
      ))}
    </div>
  );
};

export default ListGuideRequests;
