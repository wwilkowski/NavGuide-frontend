import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import * as actions from '../actions';
import { getOwnAgreementsRequest, settleAgreementRequest } from '../../Offers/actions';
import ProfileMenu from '../../../components/ProfileMenu/ProfileMenu';
import styles from './EditProfilePanel.module.scss';
import ActiveOffers from '../../../components/Offers/ActiveOffers/ActiveOffers';
import { getActiveOffersRequest, getApproachesRequest } from '../../Offers/actions';
import VerifiedOffers from '../../../components/Offers/VerifiedOffers/VerifiedOffers';
import HistoryOffers from '../../../components/Offers/HistoryOffers/HistoryOffers';
import Agreements from '../../../components/Offers/Agreements/Agreements';
import AcceptedOffers from '../../../components/Offers/AcceptedOffers/AcceptedOffers';
import { useTranslation } from 'react-i18next';
import UserProfile from '../../../components/UserProfile/UserProfile';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HistoryIcon from '@material-ui/icons/History';
import CheckIcon from '@material-ui/icons/Check';
import FaceIcon from '@material-ui/icons/Face';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: '0',
    left: '0'
  }
});

enum Scene {
  profile,
  agreements,
  confirmed,
  history
}

const EditProfilePanel = () => {
  const { t } = useTranslation();

  const classes = useStyles();
  const dispatcher = useDispatch();

  const [sceneMode, setSceneMode] = useState<Scene>(Scene.profile);
  const [value, setValue] = React.useState(0);

  const user = useSelector((state: StoreType) => state.profile.user);

  const approaches = useSelector((state: StoreType) => state.currentOfferReducer.approaches);
  const verifiedOffersTraveler = useSelector((state: StoreType) => state.currentOfferReducer.approaches);
  const historyOffersTraveler = useSelector((state: StoreType) => state.profile.historyOffers);
  const agreements = useSelector((state: StoreType) => state.currentOfferReducer.agreements);

  const onAgreementButtonClick = (agreementId: number, status: string) => {
    dispatcher(settleAgreementRequest(agreementId, status));
  };

  useEffect(() => {
    dispatcher(actions.getProfileHistoryRequest(-1));
    dispatcher(getOwnAgreementsRequest());

    if (user.role === 'GUIDE') {
      dispatcher(getActiveOffersRequest());
    } else {
      dispatcher(getApproachesRequest());
    }
  }, [dispatcher, user.role]);

  const setMode = (value: number) => {
    switch (value) {
      case 0:
        setSceneMode(Scene.profile);
        break;
      case 1:
        setSceneMode(Scene.agreements);
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
      {/* Profile */}
      <Grid item xs={12} sm={3}>
        <Container>
          <div className={sceneMode === Scene.profile ? styles.profileSection : styles.hidden}>
            <UserProfile user={user} />
          </div>
        </Container>
      </Grid>

      {/* Agreements */}
      <Grid container item sm={9}>
        <div className={sceneMode === Scene.agreements ? styles.profileSection : styles.hidden}>
          <Grid item xs={12} sm={4}>
            <div>
              {agreements && (
                <>
                  <Typography variant='h2'>{t('Your agreements')}: </Typography>
                  <Agreements
                    agreements={agreements}
                    verifiedOffers={verifiedOffersTraveler}
                    onAgreementButtonClick={onAgreementButtonClick}
                  />
                </>
              )}
            </div>
          </Grid>
        </div>
        {/* Confirmed */}
        <div className={sceneMode === Scene.confirmed ? styles.profileSection : styles.hidden}>
          <Grid item xs={12} sm={4}>
            <Typography variant='h2'>Zaakceptowane umowy</Typography>
            <AcceptedOffers agreements={agreements} />
          </Grid>
        </div>
        {/* History */}
        <div className={sceneMode === Scene.history ? styles.profileSection : styles.hidden}>
          <Grid item xs={12} sm={4}>
            <Typography variant='h2'>Historia wycieczek</Typography>
            <HistoryOffers trips={historyOffersTraveler} />
          </Grid>
        </div>
      </Grid>

      {/* Navigation */}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setMode(newValue);
        }}
        className={classes.root}
        showLabels
      >
        <BottomNavigationAction label='Profile' icon={<FaceIcon />} />
        <BottomNavigationAction label='Agreements' icon={<AssignmentIcon />} />
        <BottomNavigationAction label='Confirmed' icon={<CheckIcon />} />
        <BottomNavigationAction label='History' icon={<HistoryIcon />} />
      </BottomNavigation>
    </Grid>
  );
};

export default EditProfilePanel;
