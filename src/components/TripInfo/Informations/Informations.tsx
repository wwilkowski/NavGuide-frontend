import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../TripInfo.module.scss';
import { IInformationsProps } from './types';

const Informations = (props: IInformationsProps) => {
  const { t } = useTranslation();

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
            <b>{t('City')}:</b>
          </p>
          <p>
            <b>{t('Price')}:</b>
          </p>
          <p>
            <b>{t('Number of people (max)')}:</b>
          </p>
        </div>
        <div className={styles.content2}>
          <p>
            <b>{t('Availability')}:</b>
          </p>
          <table>
            <tr>
              <th>
                <p>{t('From')}:</p>
              </th>
              <th>
                <p>{t('To')}:</p>
              </th>
            </tr>
          </table>
        </div>
        <div className={styles.content3}>
          <p>
            <b>{t('Tags')}:</b>
          </p>
          <div className={styles.content3__tags}>
            <div className={styles.tag}>tag1</div>
            <div className={styles.tag}>tag2</div>
            <div className={styles.tag}>tag3</div>
            <div className={styles.tag}>tag4</div>
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
    </div>
  );
};

export default Informations;
