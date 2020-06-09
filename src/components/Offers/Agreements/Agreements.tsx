import React, { useState, useEffect } from 'react';
import { IAgreementsProps, IAgreementOffer } from '../../../containers/Offers/types';
import TripListElement from '../../TripBrowser/TripListElement';
import { Link } from 'react-router-dom';
import history from '../../../history';
import { useTranslation } from 'react-i18next';
import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    marginTop: '1rem',
  },
  list: {
    marginBottom: '3rem',
  },
});

const Agreements = (props: IAgreementsProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { agreements, verifiedOffers } = props;

  const [filteredAgreements, setFilteredAgreements] = useState<IAgreementOffer[]>([]);

  useEffect(() => {
    if (agreements) setFilteredAgreements(agreements.filter((agr: IAgreementOffer) => agr.status === 'PENDING'));
  }, [agreements]);

  const getDate = (date: string) => {
    return date.toString().replace('T', ' ').substr(0, date.toString().indexOf('.'));
  };

  return (
    <ul className={classes.list}>
      {filteredAgreements &&
        verifiedOffers &&
        filteredAgreements.map((agr: IAgreementOffer) => (
          <li key={agr.id} style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
            <TripListElement trip={agr.offer} />
            <Link to={`/guides/${agr.offer.owner.guideId}`} className={classes.text}>
              {t('Check guide profile')} {agr.offer.owner.guideId}
            </Link>
            <Typography variant='subtitle2' className={classes.text}>
              {t('Planned date')}: {getDate(agr.plannedDate)}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={() =>
                history.push(`/agreement/${agr.id}`, {
                  pathFrom: '/profile',
                })
              }
              className={classes.text}
            >
              {t('See more')}
            </Button>
          </li>
        ))}
    </ul>
  );
};

export default Agreements;
