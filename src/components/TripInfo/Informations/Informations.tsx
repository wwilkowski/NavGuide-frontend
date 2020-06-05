import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IInformationsProps } from './types';
import { ITag } from '../../../containers/TripBrowser/types';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import RatesOfferPopup from '../../Offers/HistoryOffers/RatesOfferPopup/RatesOfferPopup';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getOfferFeedbacksRequest } from '../../../containers/Offers/actions';
import poland from '../../../assets/icons/poland.png';
import greatBritain from '../../../assets/icons/greatBritain.png';
import germany from '../../../assets/icons/germany.png';
import Rating from '@material-ui/lab/Rating';
import { StoreType } from '../../../store';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { getInterestsRequest, signUpGoogleRequest } from '../../../containers/Registration/actions';
import { logInGoogleRequest } from '../../../containers/Profile/actions';
import GoogleButton from '../../../components/GoogleButton/GoogleButton';

const getFlag = (code: string) => {
  switch (code) {
    case 'PL':
      return poland;
    case 'EN':
      return greatBritain;
    case 'DE':
      return germany;
  }
};

const useStyles = makeStyles((theme) => ({
  flag: {
    padding: '0 0.2rem',
  },
  text: {
    marginTop: 'auto',
  },
  rateButton: {
    color: theme.palette.warning.dark,
  },
}));

const Informations = (props: IInformationsProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatcher = useDispatch();

  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);

  const { tripData, guideProfileData, guideProfile } = props;

  const [offerRatesVisible, setOfferRatesVisible] = useState<boolean>(false);
  // eslint-disable-next-line
  const [telephone, setTelephone] = useState<string>('');

  useEffect(() => {
    let result = '';
    const tmp = guideProfileData.telephone.split('');

    result = '+' + tmp[0] + tmp[1] + ' ' + tmp[2] + tmp[3] + tmp[4] + ' ' + tmp[5] + tmp[6] + tmp[7] + ' ' + tmp[8] + tmp[9] + tmp[10];
    setTelephone(result);
  }, [guideProfileData.telephone]);

  // eslint-disable-next-line
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

  const signUpWithUserCode = (code: string) => {
    dispatcher(signUpGoogleRequest(code));
    dispatcher(getInterestsRequest());
  };
  const signInWithUserCode = (code: string) => {
    dispatcher(logInGoogleRequest(code));
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.nav__menuList}>
          <li
            style={isLogged ? { width: '30%' } : { width: '100%' }}
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
            style={isLogged ? { display: 'inherit' } : { display: 'none' }}
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
          <li style={isLogged ? { display: 'inherit' } : { display: 'none' }} className={styles.nav__menuItem} onClick={() => {}}>
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
            {/* zaslepka gdy niezalogowany */}
            {!isLogged && window.innerWidth < 600 && (
              <div className={styles.plug}>
                <h3 className={styles.plug__title}> {t('Attention')}</h3>
                <p className={styles.plug__text}>{t('Login or register to see more informations')}</p>
                <ErrorOutlineIcon className={styles.plug__icon} />
              </div>
            )}
            <div className={styles.section}>
              <h2 className={styles.title}>{t('Informations')}</h2>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('City')}:</p>
                <span className={styles.value}>{tripData.city}</span>
              </div>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('Price')}:</p>
                <p className={styles.value}>
                  {tripData.price}zł ({t(tripData.priceType)})
                </p>
              </div>
              {isLogged && (
                <>
                  <div className={styles.info}>
                    <p className={styles.subtitle}>{t('Max people')}:</p>
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
                </>
              )}
            </div>
            {isLogged && (
              <div className={styles.section}>
                <h2 className={styles.title}>{t('Statistics')}</h2>
                <div className={styles.info}>
                  <p className={styles.subtitle}>{t('Sold')}:</p>
                  <p className={styles.value}>{tripData.sold}</p>
                </div>
                <div className={styles.info}>
                  <p className={styles.subtitle}>{t('Average mark')}:</p>
                  {props.tripData.averageMark > 0 ? (
                    <Rating precision={0.5} readOnly value={Math.round((props.guideProfile.averageMark * 10) / 10)}></Rating>
                  ) : (
                    <Typography>{t('N.D.')}</Typography>
                  )}
                </div>
                <div>
                  <RatesOfferPopup
                    offerId={tripData.id}
                    popupVisible={offerRatesVisible}
                    changePopupVisible={() => setOfferRatesVisible(false)}
                  />
                  <Button
                    style={window.innerWidth < 900 ? { marginBottom: '2rem' } : { marginTop: '1rem' }}
                    onClick={() => {
                      dispatcher(getOfferFeedbacksRequest(tripData.id));
                      setOfferRatesVisible(true);
                    }}
                    className={classes.rateButton}
                    disabled={false}
                  >
                    {t('See rates')}
                  </Button>
                </div>
              </div>
            )}
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
            {isLogged && (
              <div className={styles.section}>
                <h2 className={styles.title}>{t('Number of visits')}</h2>
                <p className={styles.centered}>{tripData.inSearch}</p>
              </div>
            )}
          </div>
        )}
        {(props.mode === 'guide' || window.innerWidth > 600) && isLogged && (
          <div className={styles.guideView}>
            <div>
              <Link to={`/guides/${tripData.owner.guideId}`}>
                <img src={props.guideProfileData.avatar} alt='' className={styles.avatar} />
              </Link>
            </div>
            <Link to={`/guides/${tripData.owner.guideId}`}>{t('See guide profile')}</Link>
            <p className={styles.guideName}>
              {tripData.owner.firstName} {tripData.owner.lastName}
            </p>
            <p>
              ({props.guideProfileData.age}, {t(props.guideProfileData.gender)})
            </p>
            <div className={styles.section}>
              <div className={styles.info}>
                <p className={styles.subtitle}>{t('Average mark')}:</p>
                {props.guideProfile.averageMark > 0 ? (
                  <Rating precision={0.5} readOnly value={Math.round((props.guideProfile.averageMark * 10) / 10)}></Rating>
                ) : (
                  <Typography>{t('N.D.')}</Typography>
                )}
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
                <p>
                  {guideProfile.languages.map((lng: string) => (
                    <img className={classes.flag} src={getFlag(lng)} alt={lng} />
                  ))}
                </p>
              </div>
            </div>
          </div>
        )}
        {!isLogged && window.innerWidth > 600 && (
          <div className={styles.guideView}>
            <div className={styles.plugDesktop}>
              <h3 className={styles.plugDesktop__title}> {t('Attention')}</h3>
              <p className={styles.plugDesktop__text}>{t('Login or register to see more informations')}.</p>
              <ErrorOutlineIcon className={styles.plugDesktop__icon} />
            </div>
            <div className={styles.plugDesktop__buttons}>
              <div className={styles.button}>
                <GoogleButton text='Sign in with Google' onSuccess={signInWithUserCode} onFailure={signInWithUserCode} />
              </div>
              <div className={styles.button}>
                <GoogleButton text='Sign up with Google' onSuccess={signUpWithUserCode} onFailure={signUpWithUserCode} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Informations;
