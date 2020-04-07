import React, { useState, useEffect } from 'react';
import styles from './GuideProfile.module.scss';
import GuideProfileData from '../../components/GuideProfile/GuideProfileData';
import { StoreType } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import GuideProfileActiveOffers from '../../components/GuideProfile/GuideProfileActiveOffers';
import GuideProfileHistoryOffers from '../../components/GuideProfile/GuideProfileHistoryOffers';
import {
  fetchGuideProfileDataRequest,
  fetchGuideActiveOffersRequest,
  fetchGuideHistoryRequest,
  fetchGuideProfileRequested,
} from './actions';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { showNotification } from '../../helpers/notification';
import i18n from '../../locales/i18n';
import { Grid, BottomNavigation, BottomNavigationAction, makeStyles, Typography } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import CheckIcon from '@material-ui/icons/Check';
import FaceIcon from '@material-ui/icons/Face';
import { useTranslation } from 'react-i18next';

interface TParams {
  guideId: string;
}

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
  emptyInfo: {
    padding: '1rem 3rem',
  },
});

enum Scene {
  profile,
  activeOffers,
  ratedOffers,
}

const GuideProfile = (props: RouteComponentProps<TParams>) => {
  const guideId = parseInt(props.match.params.guideId, 10);
  const classes = useStyles();
  const { t } = useTranslation();

  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);

  const [sceneMode, setSceneMode] = useState<Scene>(Scene.profile);

  const dispatcher = useDispatch();

  const guideProfile = useSelector((state: StoreType) => state.guideProfile.guideProfile);
  const guideProfileData = useSelector((state: StoreType) => state.guideProfile.guideProfileData);
  const activeOffers = useSelector((state: StoreType) => state.guideProfile.activeOffers);
  const historyOffers = useSelector((state: StoreType) => state.guideProfile.historyOffers);
  const feedbacks = useSelector((state: StoreType) => state.currentOfferReducer.feedbacks);

  useEffect(() => {
    if (!isLogged) showNotification('info', i18n.t('Information'), i18n.t('You dont have permission to this content'));
  }, [isLogged]);

  useEffect(() => {
    dispatcher(fetchGuideProfileRequested(guideId));
  }, [dispatcher, guideId]);

  useEffect(() => {
    if (isLogged) {
      if (guideProfile.userId !== -1) dispatcher(fetchGuideProfileDataRequest(guideProfile.userId));
      dispatcher(fetchGuideActiveOffersRequest(guideId));
      dispatcher(fetchGuideHistoryRequest(guideId));
    }
  }, [guideProfile, dispatcher, guideId, isLogged]);

  return (
    <Grid container>
      {isLogged && (
        <>
          {/* Profile */}
          <Grid item xs={12} sm={4} className={sceneMode === Scene.profile ? styles.profileSection : styles.hidden}>
            <Typography variant='h2' className={classes.text}>
              {t('Informations')}
            </Typography>
            <GuideProfileData profileData={guideProfileData} profile={guideProfile} />
          </Grid>
          {/* Active offers */}
          <Grid item xs={12} sm={4} className={sceneMode === Scene.activeOffers ? styles.profileSection : styles.hidden}>
            <Typography variant='h2' className={classes.text}>
              {t('Active offers')}
            </Typography>
            <GuideProfileActiveOffers activeOffers={activeOffers} />
          </Grid>
          {/* History offers */}
          <Grid item xs={12} sm={4} className={sceneMode === Scene.ratedOffers ? styles.profileSection : styles.hidden}>
            <Typography variant='h2' className={classes.text}>
              {t('History offers')}
            </Typography>
            <GuideProfileHistoryOffers historyOffers={historyOffers} />
          </Grid>
          {/* Navigation */}
          <BottomNavigation
            value={sceneMode}
            onChange={(event, newValue) => {
              setSceneMode(newValue);
            }}
            className={`${classes.root} ${window.innerWidth > 900 && classes.hidden}`}
            showLabels
          >
            <BottomNavigationAction label={t('Profile')} icon={<FaceIcon />} />
            <BottomNavigationAction label={t('Active offers')} icon={<CheckIcon />} />
            <BottomNavigationAction label={t('History')} icon={<HistoryIcon />} />
          </BottomNavigation>
        </>
      )}
      {!isLogged && <Redirect to='/' />}
    </Grid>
  );
};

export default GuideProfile;
