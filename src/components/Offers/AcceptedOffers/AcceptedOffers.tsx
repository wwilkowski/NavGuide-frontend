import React, { useState, useEffect } from 'react';
import { IAcceptedOffersProps, IAgreementOffer } from '../../../containers/Offers/types';
import { useSelector } from 'react-redux';
import { StoreType } from '../../../store';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography, makeStyles, Card, CardContent, CardActions, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    fontSize: '0.8em',
  },
  actions: {
    padding: '0.5rem 1rem',
  },
  small: {
    width: 30,
    height: 30,
    marginRight: '0.5rem',
  },
  traveler: {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    padding: '1rem 2.5rem',
  },
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
    return date.toString().replace('T', ' ').substr(0, date.toString().indexOf('.'));
  };

  return filteredAgreements && filteredAgreements.length ? (
    <ul>
      {filteredAgreements.map((agr: IAgreementOffer) => (
        <li key={agr.id} style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
          <Card className={classes.root}>
            <CardContent>
              {user.role === 'GUIDE' ? (
                <Typography variant='subtitle1' className={classes.traveler}>
                  <Avatar src={agr.traveler.avatar} className={classes.small} />
                  {agr.traveler.firstName} {agr.traveler.lastName}
                </Typography>
              ) : (
                <Typography variant='subtitle1' className={classes.traveler}>
                  <Avatar src={agr.offer.owner.avatar} className={classes.small} />
                  {agr.offer.owner.firstName} {agr.offer.owner.lastName}
                </Typography>
              )}
              <Typography variant='h3' className={classes.title}>
                {agr.offer.name}
              </Typography>
              <Typography variant='subtitle2'>
                {t('Planned date')}: {getDate(agr.plannedDate)}
              </Typography>
              <Typography variant='subtitle2'>
                {t('Price')}: {agr.price}zł ({t(agr.offer.priceType)})
              </Typography>
              <Typography variant='body1'>{agr.description}</Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              {user.role === 'GUIDE' && (
                <Link to={`/users/${agr.traveler.id}`} className={classes.link}>
                  {t('Check user profile with')} ID {agr.traveler.id}
                </Link>
              )}
              {user.role === 'TRAVELER' && (
                <Link to={`/guides/${agr.offer.owner.guideId}`} className={classes.link}>
                  {t('Check guide profile with')} ID {agr.offer.owner.guideId}
                </Link>
              )}
            </CardActions>
          </Card>
        </li>
      ))}
    </ul>
  ) : (
    <Typography variant='subtitle2' className={classes.info}>
      {t('Accepted offers will appear here.')}
    </Typography>
  );
};

export default AcceptedOffers;
