import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../TripInfo.module.scss';
import { IInformationsProps } from './types';
import { ITag } from '../../../containers/TripBrowser/types';
import { Link } from 'react-router-dom';
import { fetchGuideProfileRequested } from '../../../containers/GuideProfile/actions';
import { useDispatch } from 'react-redux';

const Informations = (props: IInformationsProps) => {
  const { t } = useTranslation();

  const { tripData, guideProfileData, guideProfile } = props;

  const dispatcher = useDispatch();

  const [activeTripButton, setActiveTripButton] = useState<boolean>(true);
  const [activeGuideButton, setActiveGuideButton] = useState<boolean>(false);

  const [experience, setExperience] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');

  useEffect(() => {
    let tmp = '';
    for (let i = 0; i < guideProfile.experience; i++) {
      tmp += '★';
    }
    for (let i = guideProfile.experience; i < 5; i++) {
      tmp += '☆';
    }
    setExperience(tmp);
  }, [guideProfileData, guideProfile.experience]);

  useEffect(() => {
    let result = '';
    const tmp = guideProfileData.telephone.split('');

    result = '+' + tmp[0] + tmp[1] + ' ' + tmp[2] + tmp[3] + tmp[4] + ' ' + tmp[5] + tmp[6] + tmp[7] + ' ' + tmp[8] + tmp[9] + tmp[10];
    setTelephone(result);
  }, [guideProfileData.telephone]);

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
        <Link className={styles.orderButton} to={`/offers/${tripData.id}/buy`}>
          {t('Order now!')}
        </Link>
      </div>
      {props.mode === 'trip' ? (
        <div>
          <div className={styles.informations__content}>
            <div className={styles.content1}>
              <p className={styles.title}>{t('Informations')}</p>
              <p className={styles.left}>{t('City')}:</p>
              <p className={styles.right}>{tripData.city}</p>
              <p className={styles.left} style={{ width: '15%' }}>
                {t('Price')}:
              </p>
              <p className={styles.right} style={{ width: '85%' }}>
                {tripData.price} ({tripData.priceType})
              </p>
              <p className={styles.left} style={{ width: '85%' }}>
                {t('Max people')}:
              </p>
              <p className={styles.right} style={{ width: '15%' }}>
                {' '}
                {tripData.maxPeople}
              </p>
            </div>
            <div className={styles.content2}>
              <p className={styles.title}>{t('Availability')}</p>
              <p className={styles.left}>{t('From')}:</p>
              <p className={styles.right}>{tripData.begin.replace('T', ' ').substr(0, tripData.begin.indexOf('.'))}</p>

              <p className={styles.left}>{t('To')}:</p>
              <p className={styles.right}>{tripData.end.replace('T', ' ').substr(0, tripData.end.indexOf('.'))}</p>
            </div>
            <div className={styles.content2}>
              <p className={styles.title}>{t('Statistic')}</p>
              <p className={styles.left}>{t('Sold')}:</p>
              <p className={styles.right}>{tripData.sold}</p>

              <p className={styles.left}>{t('Average mark')}:</p>
              <p className={styles.right}>{tripData.averageMark > 0 ? tripData.averageMark : 0}</p>
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
              <p className={styles.title} style={{ width: '65%' }}>
                {t('Number of visits')}
              </p>
              <p>23</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.informations__content}>
            <div className={styles.avatar}>
              <Link to='/guide_profile' onClick={() => dispatcher(fetchGuideProfileRequested(tripData.owner.guideId))}>
                <img src={props.guideProfileData.avatar} alt='' />
              </Link>
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
              <p className={styles.left}>{t('Experience')}:</p>
              <p className={styles.right}>{experience}</p>
              <p className={styles.left}>{t('Average mark')}:</p>
              <p className={styles.right}>{guideProfile.averageMark > 0 ? guideProfile.averageMark : 0}</p>
              <p className={styles.title}>{t('Contact')}</p>
              <p className={styles.left}>{t('Tel')}.:</p>
              <p className={styles.right}>{telephone}</p>
              <p className={styles.left} style={{ width: '15%' }}>
                {t('Email')}:
              </p>
              <p className={styles.right} style={{ width: '85%' }}>
                {props.guideProfileData.email}
              </p>
              <p className={styles.title}>{t('Speech')}</p>
              <p className={styles.left}>{t('Country')}:</p>
              <p className={styles.right}>{props.guideProfileData.country}</p>
              <p className={styles.left}>{t('Languages')}:</p>
              <p className={styles.right}>{guideProfile.languages.map((lng: string) => `${lng} `)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Informations;
