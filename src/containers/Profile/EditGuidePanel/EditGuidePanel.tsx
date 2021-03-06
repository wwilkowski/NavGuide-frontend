import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Offers/actions';
import { StoreType } from '../../../store';
import AcceptedOffers from '../../../components/Offers/AcceptedOffers/AcceptedOffers';
import OrderedOffers from '../../../components/Offers/OrderedOffers/OrderedOffers';
import { fetchGuideHistoryRequest } from '../../../containers/GuideProfile/actions';
import HistoryOffers from '../../../components/Offers/HistoryOffers/HistoryOffers';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HistoryIcon from '@material-ui/icons/History';
import CheckIcon from '@material-ui/icons/Check';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ActiveOffers from '../../../components/Offers/ActiveOffers/ActiveOffers';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: '0',
    left: '0',
  },
  hidden: {
    display: 'none',
  },
  text: {
    padding: '0 1.5rem',
    fontSize: '1.3em',
  },
});

enum Scene {
  notifications,
  inprogress,
  confirmed,
  history,
}

const EditGuidePanel = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatcher = useDispatch();

  const activeOffers = useSelector((state: StoreType) => state.currentOfferReducer.activeOffers);
  const agreements = useSelector((state: StoreType) => state.currentOfferReducer.agreements);
  const historyOffers = useSelector((state: StoreType) => state.guideProfile.historyOffers);
  const feedbacks = useSelector((state: StoreType) => state.profile.feedbacks);

  useEffect(() => {
    dispatcher(actions.getActiveOffersRequest());
    dispatcher(actions.getOwnAgreementsRequest());
  }, [dispatcher]);

  useEffect(() => {
    if (activeOffers) {
      if (activeOffers.length > 0) dispatcher(fetchGuideHistoryRequest(activeOffers[0].offer.owner.guideId));
    }
  }, [activeOffers, dispatcher]);

  const [sceneMode, setSceneMode] = useState<Scene>(Scene.notifications);
  const [value, setValue] = React.useState(0);

  const setMode = (value: number) => {
    switch (value) {
      case 0:
        setSceneMode(Scene.notifications);
        break;
      case 1:
        setSceneMode(Scene.inprogress);
        break;
      case 2:
        setSceneMode(Scene.confirmed);
        break;
      case 3:
        setSceneMode(Scene.history);
        break;
      default:
        break;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={3} className={!(sceneMode === Scene.notifications) && window.innerWidth < 900 ? classes.hidden : ''}>
        <Typography variant='h2' className={classes.text}>
          {t('Notifications')}
        </Typography>
        <OrderedOffers trips={activeOffers} agreements={agreements} />
      </Grid>
      <Grid item xs={12} sm={3} className={!(sceneMode === Scene.inprogress) && window.innerWidth < 900 ? classes.hidden : ''}>
        <Typography variant='h2' className={classes.text}>
          {t('In progress')}
        </Typography>
        {activeOffers ? (
          <ActiveOffers trips={activeOffers.filter((offer) => offer.status === 'ACCEPTED')} agreements={agreements} />
        ) : (
          <p>brak</p>
        )}
      </Grid>
      <Grid item xs={12} sm={3} className={!(sceneMode === Scene.confirmed) && window.innerWidth < 900 ? classes.hidden : ''}>
        <Typography variant='h2' className={classes.text}>
          {t('Confirmed')}
        </Typography>
        <AcceptedOffers agreements={agreements} />
      </Grid>
      <Grid item xs={12} sm={3} className={!(sceneMode === Scene.history) && window.innerWidth < 900 ? classes.hidden : ''}>
        <Typography variant='h2' className={classes.text}>
          {t('History')}
        </Typography>
        <HistoryOffers userRole='guide' trips={historyOffers} feedbacks={feedbacks} />
      </Grid>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setMode(newValue);
        }}
        className={`${classes.root} ${window.innerWidth > 900 && classes.hidden}`}
        showLabels
      >
        <BottomNavigationAction label={t('Notifications')} icon={<AssignmentIcon />} />
        <BottomNavigationAction label={t('In progress')} icon={<AssignmentIcon />} />
        <BottomNavigationAction label={t('Confirmed')} icon={<CheckIcon />} />
        <BottomNavigationAction label={t('History')} icon={<HistoryIcon />} />
      </BottomNavigation>
    </Grid>
  );
};

export default EditGuidePanel;
