import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../TripInfo.module.scss';
import { IInformationsProps } from './types';
import { ITag } from '../../../containers/TripBrowser/types';

const Informations = (props: IInformationsProps) => {
  const { t } = useTranslation();
  const { tripData } = props;

  const [activeTripButton, setActiveTripButton] = useState<boolean>(true);
  const [activeGuideButton, setActiveGuideButton] = useState<boolean>(false);

  return (
    <>
      <div className={styles.informations__header}>
        {activeTripButton ? (
          <div
            className={styles.buttonActive}
            onClick={() => {
              props.changeInformationsMode('trip');
              if (!activeTripButton) setActiveTripButton(!activeTripButton);
              if (activeGuideButton) setActiveGuideButton(!activeGuideButton);
            }}
          >
            {t('trip')}
          </div>
        ) : (
          <div
            className={styles.button}
            onClick={() => {
              props.changeInformationsMode('trip');
              if (!activeTripButton) setActiveTripButton(!activeTripButton);
              if (activeGuideButton) setActiveGuideButton(!activeGuideButton);
            }}
          >
            {t('trip')}
          </div>
        )}
        {!activeGuideButton ? (
          <div
            className={styles.button}
            onClick={() => {
              props.changeInformationsMode('guide');
              if (!activeGuideButton) setActiveGuideButton(!activeGuideButton);
              if (activeTripButton) setActiveTripButton(!activeTripButton);
            }}
          >
            {t('guide')}
          </div>
        ) : (
          <div
            className={styles.buttonActive}
            onClick={() => {
              props.changeInformationsMode('guide');
              if (!activeGuideButton) setActiveGuideButton(!activeGuideButton);
              if (activeTripButton) setActiveTripButton(!activeTripButton);
            }}
          >
            {t('guide')}
          </div>
        )}
      </div>
      {props.mode === 'trip' ? (
        <div>
          <div className={styles.informations__content}>
            <h1>
              <b>{t('Informations')}</b>
            </h1>
            <div className={styles.content1}>
              <p>
                <b>{t('City')}:</b> {tripData.city}
              </p>
              <p>
                <b>{t('Price')}: </b>
                {tripData.price} ({tripData.priceType})
              </p>
              <p>
                <b>{t('Number of people (max)')}: </b>
                {tripData.maxPeople}
              </p>
            </div>
            <div className={styles.content2}>
              <p style={{ width: '100%' }}>
                <b>{t('Availability')}:</b>
              </p>
              <div style={{ width: '50%' }}>
                <p>
                  <b>{t('From')}: </b> 1.01.2020
                </p>
              </div>
              <div>
                <p>
                  <b>{t('To')}: </b> 1.03.2020
                </p>
              </div>
            </div>
            <div className={styles.content3}>
              <div className={styles.content3__tags}>
                {tripData.tags.map((tag: ITag, index: number) => (
                  <div key={index} className={styles.tag}>
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.content4}>
              <p>
                <b>{t('Number of visits')}</b>
              </p>
              <p>23</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.informations__content}>
            <div className={styles.avatar}>
              <img src={props.guideProfileData.avatar} alt='' />
            </div>
            <div className={styles.guideContent1}>
              <p>
                {tripData.owner.firstName} {tripData.owner.lastName}
              </p>
              <p style={{ fontSize: '1.5vh', fontWeight: 'initial', marginTop: '-0.2rem' }}>
                ({props.guideProfileData.age}, {props.guideProfileData.gender})
              </p>
            </div>
            <div className={styles.content1}>
              <p>
                <b>{t('Tel')}.:</b> {props.guideProfileData.telephone}
              </p>
              <p>
                <b>{t('Email')}:</b> {props.guideProfileData.email}
              </p>
              <p>
                <b>{t('Country')}:</b> {props.guideProfileData.country}
              </p>
              <p>
                <b>{t('Languages')}:</b> {tripData.owner.languages.map((lng: string) => `${lng} `)}
              </p>
            </div>
            <div className={styles.content3}>
              <p>
                <b>{t('Experience')}:</b>
              </p>
              <p style={{ fontSize: '1.1em' }}>★★★☆☆</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Informations;
