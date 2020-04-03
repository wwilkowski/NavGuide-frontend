import React from 'react';
import { ISingleTripType, ITag } from '../../containers/TripBrowser/types';
import styles from './TripListElement.module.scss';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';

interface Props {
  trip: ISingleTripType;
  hidePhoto?: boolean;
}

const priceTypes = {
  PER_PERSON: 'per person',
  PER_GROUP: 'per group'
};

const getLanguage = (code: string) => {
  switch (code) {
    case 'PL':
      return 'Polish';
    case 'EN':
      return 'English';
    case 'DE':
      return 'German';
    default:
      return '';
  }
};

const TripListElement = ({ trip, hidePhoto }: Props) => {
  const isLogged: boolean = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const { t } = useTranslation();
  return (
    <Paper elevation={1}>
      <Link to={`/offers/${trip.id}`} className={styles.link}>
        <div key={trip.id} className={styles.offer}>
          {!hidePhoto && (
            <img
              src={trip.photos ? trip.photos[0] : 'https://pwik.krzanowice.pl/uploads/default-image.png'}
              alt='offer view'
              className={styles.offer__photo}
            />
          )}

          <div className={styles.offer__desc}>
            <Typography variant='h3'>
              {trip.name} ({trip.id})
            </Typography>
            <Typography variant='subtitle2'>
              {t('City')}: {trip.city}
            </Typography>
            <Typography variant='subtitle2'>
              {t('Price')}: {trip.price}zł <span>({t(priceTypes['PER_PERSON'])})</span>
            </Typography>
            {isLogged && trip.owner && (
              <div>
                <Typography variant='subtitle2'>
                  {t('Guide')}: {trip.owner.firstName} {trip.owner.lastName}
                </Typography>
                <div className={styles.offer__row}>
                  <Typography variant='subtitle2'>{t('Languages')}: </Typography>
                  <ul className={styles.offer__languages}>
                    {trip.owner.languages.map((lang: string) => (
                      <li className={styles.offer__langElement} key={lang}>
                        <Typography component='span' variant='subtitle2'>
                          {t(getLanguage(lang))}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {trip.tags && trip.tags.length > 0 && (
              <ul className={styles.offer__tags}>
                {trip.tags.map((tag: ITag) => (
                  <li key={tag.name} className={styles.offer__tag}>
                    <span>{t(tag.name)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Link>
    </Paper>
  );
};

export default TripListElement;
