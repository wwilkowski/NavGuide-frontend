import React, { useState, useEffect } from 'react';
import { IAcceptedOffersProps, IAgreementOffer } from '../../../containers/Offers/types';
import TripListElement from '../../TripBrowser/TripListElement';
import { useSelector } from 'react-redux';
import { StoreType } from '../../../store';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    marginTop: '1rem'
  },
  list: {
    marginBottom: '3rem'
  }
});

const AcceptedOffers = (props: IAcceptedOffersProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { agreements } = props;

  const location = useLocation();

  const user = useSelector((state: StoreType) => state.profile.user);

  const [filteredAgreements, setFilteredAgreements] = useState<IAgreementOffer[]>([]);

  useEffect(() => {
    const tmp: IAgreementOffer[] = [];
    if (agreements) {
      agreements.forEach((agr: IAgreementOffer) => {
        if (agr.status === 'ACCEPTED') tmp.push(agr);
      });

      if (user.role && location.pathname === '/profile')
        setFilteredAgreements(tmp.filter((agr: IAgreementOffer) => agr.offer.owner.userId !== user.id));

      if (user.role && location.pathname === '/profile/guide') setFilteredAgreements(tmp);
    }
  }, [agreements, location.pathname, user.id, user.role]);

  const getDate = (date: string) => {
    return date
      .toString()
      .replace('T', ' ')
      .substr(0, date.toString().indexOf('.'));
  };

  return (
    <ul className={classes.list}>
      {filteredAgreements.map((agr: IAgreementOffer) => (
        <li key={agr.id} style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
          <Typography variant='subtitle2'>
            <b>{t('Planned date')}:</b> {getDate(agr.plannedDate)}
          </Typography>
          <TripListElement trip={agr.offer} hidePhoto={true} />
          {user.role === 'GUIDE' && (
            <Link to={`/users/${agr.traveler.id}`} className={classes.text}>
              <p>
                {t('Check user profile with')} ID {agr.traveler.id}
              </p>
            </Link>
          )}
          {user.role === 'TRAVELER' && (
            <Link to={`/guides/${agr.offer.owner.guideId}`} className={classes.text}>
              {t('Check guide profile with')} ID {agr.offer.owner.guideId}
            </Link>
          )}

          <Typography variant='subtitle2'>
            {t('Price')}: {agr.price}zł ({t(agr.offer.priceType)})
          </Typography>
          <Typography variant='subtitle2'>{t('Description')}:</Typography>
          <Typography variant='body1'>{agr.description}</Typography>
        </li>
      ))}
    </ul>
  );
};

export default AcceptedOffers;
