import React, { useState } from 'react';
import styles from './TripInfo.module.scss';
import { ITripInfoProps } from './types';
import Gallery from './Gallery/Gallery';
import Informations from './Informations/Informations';
import Description from './Description/Description';
import { useTranslation } from 'react-i18next';

const TripInfo = (props: ITripInfoProps) => {
  const { t } = useTranslation();

  const [informationsMode, setInformationsMode] = useState<string>('trip');

  const changeInformationsMode = (mode: string) => {
    setInformationsMode(mode);
  };

  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoContainer__content}>
        <div className={styles.infoContainer__header}>Nazwa wycieczki</div>
        <div className={styles.gallery}>
          <Gallery />
        </div>
        <div className={styles.informations}>
          <Informations mode={informationsMode} changeInformationsMode={changeInformationsMode} />
        </div>
        <div>
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>{t('Description')}</p>
        </div>
        <div className={styles.description} onClick={() => props.changeTripInfoVisible(1)}>
          <Description />
        </div>
      </div>
    </div>
  );
};

export default TripInfo;
