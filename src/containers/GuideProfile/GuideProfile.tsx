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
import GuideProfileHistoryOffers from '../../components/GuideProfile/GuideProfileHistoryOffers';
import history from '../../history';
import { RouteComponentProps } from 'react-router-dom';

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

  const [sceneMode, setSceneMode] = useState<Scene>(Scene.profile);

  const dispatcher = useDispatch();

  const guideProfile = useSelector((state: StoreType) => state.guideProfile.guideProfile);
  const guideProfileData = useSelector((state: StoreType) => state.guideProfile.guideProfileData);
  const activeOffers = useSelector((state: StoreType) => state.guideProfile.activeOffers);
  const historyOffers = useSelector((state: StoreType) => state.guideProfile.historyOffers);

  useEffect(() => {
    dispatcher(fetchGuideProfileRequested(guideId));
  }, [dispatcher, guideId]);

  useEffect(() => {
    if (guideProfile.userId !== -1) dispatcher(fetchGuideProfileDataRequest(guideProfile.userId));
    dispatcher(fetchGuideActiveOffersRequest(guideId));
    dispatcher(fetchGuideHistoryRequest(guideId));
  }, [guideProfile, dispatcher, guideId]);

  const backToMainPage = () => {
    sessionStorage.setItem('backFromGuideProfile', 'true');
    history.goBack();
  };

  return (
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
        <GuideProfileHistoryOffers historyOffers={historyOffers} goBack={backToMainPage} />
      </div>
      <GuideProfileMenu setScene={setSceneMode} />
    </div>
  );
};

export default GuideProfile;
