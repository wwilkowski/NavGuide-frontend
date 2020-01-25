import React from 'react';
import { IListGuideRequestProps } from './types';
import styles from '../TripBrowser/ListTrips.module.scss';
import * as types from '../../containers/AdminPanel/types';
import { useTranslation } from 'react-i18next';

const ListGuideRequests = (props: IListGuideRequestProps) => {
  const { guideRequests } = props;
  const { t } = useTranslation();

  console.log(guideRequests);
  return (
    <ul className={styles.tripsList}>
      {guideRequests.map((req: types.IGuideRequest, index: number) => (
        <li key={req.id} className={styles.listItem}>
          <div className={styles.description}>
            <h2 className={styles.title}>
              {t('ID')}: {req.id}
              {` `}
              {req.status}
            </h2>
            <div className={styles.informations}>
              <p>
                {t('Date')}: {req.date}
              </p>
              <p>{t('Experience')}: *****</p>
              <p>{req.description}</p>
              <p>
                {t('Languages')}: {req.languages.map((lng: string) => `${lng} `)}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListGuideRequests;
