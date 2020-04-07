import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IInformationsProps } from './types';
import { ITag } from '../../../containers/TripBrowser/types';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import RatesOfferPopup from '../../Offers/HistoryOffers/RatesOfferPopup/RatesOfferPopup';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getOfferFeedbacksRequest } from '../../../containers/Offers/actions';

const Informations = (props: IInformationsProps) => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const { tripData, guideProfileData, guideProfile } = props;

  const [offerRatesVisible, setOfferRatesVisible] = useState<boolean>(false);
  const [experience, setExperience] = useState<string>('');
  // eslint-disable-next-line
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

  const getLanguage = (code: string) => {
    switch (code) {
      case 'PL':
        return t('Polish');
      case 'EN':
        return t('English');
      case 'DE':
        return t('German');
    }
  };

  const getCountry = (code: string) => {
    switch (code) {
      case 'PL':
        return t('Poland');
      case 'EN':
        return t('England');
      case 'DE':
        return t('Germany');
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.nav__menuList}>
          <li
            className={styles.nav__menuItem}
            onClick={() => {
              props.changeInformationsMode('trip');
            }}
          >
            <div className={styles.nav__case}>
              <img className={styles.nav__icon} src={''} alt='' />
              <p className={styles.nav__p}>{t('Offer')}</p>
            </div>
          </li>
          <li
            className={styles.nav__menuItem}
            onClick={() => {
              props.changeInformationsMode('guide');
            }}
          >
            <div className={styles.nav__case}>
              <img className={styles.nav__icon} src={''} alt='' />
              <p className={styles.nav__p}>{t('Guide')}</p>
            </div>
          </li>
          <li className={styles.nav__menuItem} onClick={() => {}}>
            <div className={styles.nav__case}>
              <Link to={`/offers/${tripData.id}/buy`} className={styles.link}>
                {t('Order now')}!
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <div className={styles.infoContainer}>
        {(props.mode === 'trip' || window.innerWidth > 600) && (
          <div className={styles.tripView}>
            <div className={styles.section}>
              <h2 className={styles.title}>{t('Informations')}</h2>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('City')}</p>
                <span className={styles.value}>{tripData.city}</span>
              </div>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('Price')}</p>
                <p className={styles.value}>
                  {tripData.price} ({t(tripData.priceType)})
                </p>
              </div>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('Max people')}</p>
                <p className={styles.value}> {tripData.maxPeople}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('From')}:</p>
                <p className={styles.value}>{tripData.begin.toString().substr(0, tripData.begin.toString().indexOf('T'))}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('To')}:</p>
                <p className={styles.value}>{tripData.end.toString().substr(0, tripData.end.toString().indexOf('T'))}</p>
              </div>
            </div>
            <div className={styles.section}>
              <h2 className={styles.title}>{t('Statistics')}</h2>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('Sold')}:</p>
                <p className={styles.value}>{tripData.sold}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('Average mark')}:</p>
                <p className={styles.value}>{tripData.averageMark > 0 ? tripData.averageMark : 0}</p>
              </div>
              <div>
                <RatesOfferPopup
                  offerId={tripData.id}
                  popupVisible={offerRatesVisible}
                  changePopupVisible={() => setOfferRatesVisible(false)}
                />
                <Button
                  style={window.innerWidth < 900 ? { marginBottom: '5rem' } : {}}
                  onClick={() => {
                    dispatcher(getOfferFeedbacksRequest(tripData.id));
                    setOfferRatesVisible(true);
                  }}
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={false}
                >
                  {t('Zobacz oceny')}
                </Button>
              </div>
            </div>
            <div className={styles.section}>
              <h2 className={styles.title}>{t('Tags')}</h2>
              <ul className={styles.tagList}>
                {tripData.tags.map((tag: ITag, index: number) => (
                  <li key={index} className={styles.tag}>
                    {t(tag.name)}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.section}>
              <h2 className={styles.title}>{t('Number of visits')}</h2>
              <p className={styles.centered}>{tripData.inSearch}</p>
            </div>
          </div>
        )}

        {(props.mode === 'guide' || window.innerWidth > 600) && (
          <div className={styles.guideView}>
            <div>
              <Link to={`/guides/${tripData.owner.guideId}`}>
                <img src={props.guideProfileData.avatar} alt='' className={styles.avatar} />
              </Link>
            </div>
            <p className={styles.guideName}>
              {tripData.owner.firstName} {tripData.owner.lastName}
            </p>
            <p>
              ({props.guideProfileData.age}, {t(props.guideProfileData.gender)})
            </p>
            <div className={styles.section}>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('Experience')}:</p>
                <p>{experience}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('Average mark')}:</p>
                <p>{guideProfile.averageMark > 0 ? guideProfile.averageMark : 0}</p>
              </div>
            </div>
            <div className={styles.section}></div>
            <div className={styles.section}>
              <h2 className={styles.title}>{t('Speech')}</h2>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('Country')}:</p>
                <p>{getCountry(props.guideProfileData.country)}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('Languages')}:</p>
                <p>{guideProfile.languages.map((lng: string) => `${getLanguage(lng)} `)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Informations;
