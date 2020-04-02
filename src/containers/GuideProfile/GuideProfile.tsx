import React, { useState, useEffect } from 'react';
import styles from './GuideProfile.module.scss';
import GuideProfileMenu from '../../components/GuideProfileMenu/GuideProfileMenu';
import GuideProfileData from '../../components/GuideProfile/GuideProfileData';
import { StoreType } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import GuideProfileActiveOffers from '../../components/GuideProfile/GuideProfileActiveOffers';
import {
  fetchGuideProfileDataRequest,
  fetchGuideActiveOffersRequest,
  fetchGuideHistoryRequest,
  fetchGuideProfileRequested
} from './actions';
import history from '../../history';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { showNotification } from '../../helpers/notification';
import HistoryOffers from '../../components/Offers/HistoryOffers/HistoryOffers';

interface TParams {
  guideId: string;
}

enum Scene {
  profile,
  activeOffers,
  ratedOffers
}

const GuideProfile = (props: RouteComponentProps<TParams>) => {
  const guideId = parseInt(props.match.params.guideId, 10);

  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);

  const [sceneMode, setSceneMode] = useState<Scene>(Scene.profile);

  const dispatcher = useDispatch();

  const guideProfile = useSelector((state: StoreType) => state.guideProfile.guideProfile);
  const guideProfileData = useSelector((state: StoreType) => state.guideProfile.guideProfileData);
  const activeOffers = useSelector((state: StoreType) => state.guideProfile.activeOffers);
  const historyOffers = useSelector((state: StoreType) => state.guideProfile.historyOffers);
  const feedbacks = useSelector((state: StoreType) => state.currentOfferReducer.feedbacks);

  useEffect(() => {
    if (!isLogged) showNotification('info', 'Information', 'You dont have permission to this content');
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

  const backToMainPage = () => {
    sessionStorage.setItem('backFromGuideProfile', 'true');
    history.goBack();
  };

  return (
    <>
      {isLogged && (
        <div className={styles.container}>
          <div className={sceneMode === Scene.profile ? styles.container__section : styles.container__sectionHidden}>
            <GuideProfileData profileData={guideProfileData} profile={guideProfile} goBack={backToMainPage} />
          </div>
          <div className={sceneMode === Scene.activeOffers ? styles.container__section : styles.container__sectionHidden}>
            <GuideProfileActiveOffers activeOffers={activeOffers} goBack={backToMainPage} />
          </div>
          <div
            className={sceneMode === Scene.ratedOffers ? styles.container__section : styles.container__sectionHidden}
            style={{ borderRight: 'none', paddingRight: '0' }}
          >
            <HistoryOffers userRole='guide' trips={historyOffers} feedbacks={feedbacks} />
          </div>
          <GuideProfileMenu setScene={setSceneMode} />
        </div>
      )}
      {!isLogged && <Redirect to='/' />}
    </>
  );
};

export default GuideProfile;
