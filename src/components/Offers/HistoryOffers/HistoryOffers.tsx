import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IProfileHistoryOffersProps, IFeedback, IGotFeedback } from '../../../containers/Offers/types';
import { IEndedSingleTripType } from '../../../containers/TripBrowser/types';
import * as actions from '../../../containers/Offers/actions';
import { useDispatch } from 'react-redux';
import { makeStyles, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TravelerOfferRate from './TravelerOfferRate';
import RateOfferPopup from './RateOfferPopup/RateOfferPopup';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
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
    color: '#3273dc',
    cursor: 'pointer',
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
  rateRoot: {
    flexGrow: 1,
  },
  ratePaper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  subtitlePaper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  rateInfo: {
    fontSize: '0.8em',
    color: '#f789ae',
  },
  info: {
    padding: '1rem 2.5rem',
  },
}));

const HistoryOffers = (props: IProfileHistoryOffersProps) => {
  const { t } = useTranslation();
  const { trips, feedbacks, userRole } = props;
  const dispatcher = useDispatch();
  const classes = useStyles();

  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [offerId, setOfferId] = useState<number>();

  const handleFormSubmit = (arg: IFeedback) => {
    const feedback: IFeedback = {
      offerId: arg.offerId,
      scoreOffer: arg.scoreOffer,
      scoreGuide: arg.scoreGuide,
      comment: arg.comment,
    };

    dispatcher(actions.addFeedbackRequest(feedback));
    setPopupVisible(false);
  };

  const isRated = (id: number) => {
    if (feedbacks && feedbacks.find((feedback: IGotFeedback) => feedback.offer.id === id)) return true;
    return false;
  };

  const getDate = (date: Date) => {
    return date.toString().replace('T', ' ').substr(0, date.toString().indexOf('.'));
  };

  return trips && trips.length ? (
    <ul>
      {trips &&
        trips.map((trip: IEndedSingleTripType) => (
          <li
            key={trip.offer.id}
            style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}
          >
            <Card className={classes.root}>
              <CardContent>
                <Typography variant='h3' className={classes.title}>
                  {trip.offer.name}
                </Typography>
                <Typography variant='subtitle2'>{getDate(trip.dateMeeting)} </Typography>
                {feedbacks && (
                  <TravelerOfferRate feedback={feedbacks.find((feedback: IGotFeedback) => trip.offer.id === feedback.offer.id)} />
                )}
                {userRole === 'traveler' && !isRated(trip.offer.id) && (
                  <>
                    <Typography variant='subtitle2'>Podobała Ci się ta wycieczka?</Typography>
                    <Typography
                      variant='subtitle2'
                      className={classes.link}
                      onClick={() => {
                        setOfferId(trip.offer.id);
                        setPopupVisible(!popupVisible);
                      }}
                    >
                      Podziel się z nami opinią.
                    </Typography>

                    {/* <Grid item xs={2} sm={5}>
                      <Paper elevation={0} className={classes.ratePaper}>
                        <AddIcon
                          fontSize='large'
                          className={styles.icon}
                          onClick={() => {
                            setOfferId(trip.offer.id);
                            setPopupVisible(!popupVisible);
                          }}
                        />
                      </Paper>
                    </Grid> */}
                    <RateOfferPopup
                      offerId={offerId ? offerId : -1}
                      popupVisible={popupVisible}
                      changePopupVisible={() => setPopupVisible(!popupVisible)}
                      onSubmit={handleFormSubmit}
                    />
                  </>
                )}
              </CardContent>
              <CardActions className={classes.actions}>
                {/* <Link to={`/agreement/create/${trip.traveler.id}/${trip.offer.id}/${trip.id}`} className={classes.link}>
                  Szczegóły oferty
                </Link> */}
                <Link to={`/agreement/create/`} className={classes.link}>
                  Szczegóły oferty
                </Link>
                {userRole === 'traveler' && isRated(trip.offer.id) ? (
                  <>
                    <Grid item sm={12} xs={12}>
                      <Paper elevation={0} className={classes.subtitlePaper}>
                        <Typography variant='body1' className={classes.rateInfo}>
                          Oferta oceniona. Dziękujemy!
                        </Typography>
                      </Paper>
                    </Grid>
                  </>
                ) : (
                  <Typography variant='body1' className={classes.rateInfo}>
                    Oczekuje na ocenę
                  </Typography>
                )}
              </CardActions>
            </Card>
            {/* <TripListElement trip={trip.offer} hidePhoto={true} />
            <TripListElement trip={trip.offer} hidePhoto={true} />
            <Grid style={window.innerWidth < 900 ? { marginBottom: '3.5rem' } : {}} container justify='center' xs={12} sm={12}>

            </Grid> */}
          </li>
        ))}
    </ul>
  ) : (
    <Typography variant='subtitle2' className={classes.info}>
      {t('Offers that have taken place will appear here. You will have access to grades.')}
    </Typography>
  );
};

export default HistoryOffers;
