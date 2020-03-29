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

const useStyles = makeStyles({
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: '0',
    left: '0'
  },
  hidden: {
    display: 'none'
  }
});

enum Scene {
  notifications,
  confirmed,
  history
}

const EditGuidePanel = () => {
  const classes = useStyles();
  const dispatcher = useDispatch();

  const activeOffers = useSelector((state: StoreType) => state.currentOfferReducer.activeOffers);
  const agreements = useSelector((state: StoreType) => state.currentOfferReducer.agreements);
  const historyOffers = useSelector((state: StoreType) => state.guideProfile.historyOffers);

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
        setSceneMode(Scene.confirmed);
        break;
      case 2:
        setSceneMode(Scene.history);
        break;
      default:
        break;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <div className={!(sceneMode === Scene.notifications) ? classes.hidden : ''}>
          <Typography variant='h2'>Powiadomienia</Typography>
          <OrderedOffers trips={activeOffers} agreements={agreements} />
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className={!(sceneMode === Scene.confirmed) ? classes.hidden : ''}>
          <Typography variant='h2'>Zaakceptowane umowy</Typography>
          <AcceptedOffers agreements={agreements} />
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className={!(sceneMode === Scene.history) ? classes.hidden : ''}>
          <Typography variant='h2'>Historia wycieczek</Typography>
          <HistoryOffers trips={historyOffers} />
        </div>
      </Grid>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setMode(newValue);
        }}
        className={classes.root}
        showLabels
      >
        <BottomNavigationAction label='Agreements' icon={<AssignmentIcon />} />
        <BottomNavigationAction label='Confirmed' icon={<CheckIcon />} />
        <BottomNavigationAction label='History' icon={<HistoryIcon />} />
      </BottomNavigation>
    </Grid>
  );
};

export default EditGuidePanel;
