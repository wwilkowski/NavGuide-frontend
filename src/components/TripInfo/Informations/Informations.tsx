import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../TripInfo.module.scss';
import { IInformationsProps } from './types';
import { ITag } from '../../../containers/TripBrowser/types';

const Informations = (props: IInformationsProps) => {
  const { t } = useTranslation();
  const { tripData } = props;
  return props.mode === 'trip' ? (
    <div>
      <div className={styles.informations__header}>
        <button onClick={() => props.changeInformationsMode('trip')}>{t('trip')}</button>
        <button onClick={() => props.changeInformationsMode('guide')}>{t('guide')}</button>
      </div>
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
      <div className={styles.informations__header}>
        <button onClick={() => props.changeInformationsMode('trip')}>{t('trip')}</button>
        <button onClick={() => props.changeInformationsMode('guide')}>{t('guide')}</button>
      </div>
      <div className={styles.informations__content}>
        <div className={styles.avatar}>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/512px-User_font_awesome.svg.png'></img>
        </div>
        <div className={styles.guideContent1}>
          <p>
            {tripData.owner.firstName} {tripData.owner.lastName}
          </p>
        </div>
        <div className={styles.content1}>
          <p>
            <b>{t('Email')}:</b>
          </p>
          <p>
            <b>{t('Country')}:</b>
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
  );
};

export default Informations;
