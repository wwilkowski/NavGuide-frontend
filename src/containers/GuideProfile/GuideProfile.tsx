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
  fetchGuideHistoryRequest
} from '../../containers/TripBrowser/actions';

enum Scene {
  profile,
  activeOffers,
  ratedOffers
}

const GuideProfile = () => {
  const [sceneMode, setSceneMode] = useState<Scene>(Scene.profile);

  const dispatcher = useDispatch();

  /* w Informations jest onClick na Link, ktory pobiera guideProfile */
  const guideProfile = useSelector((state: StoreType) => state.guideProfile.guideProfile);
  const guideProfileData = useSelector((state: StoreType) => state.guideProfile.guideProfileData);
  const activeOffers = useSelector((state: StoreType) => state.guideProfile.activeOffers);

  useEffect(() => {
    dispatcher(fetchGuideProfileDataRequest(guideProfile.userId));
    dispatcher(fetchGuideActiveOffersRequest(guideProfile.guideId));
    dispatcher(fetchGuideHistoryRequest(guideProfile.guideId));
  }, [guideProfile]);

  return (
    <div className={styles.container}>
      <div className={sceneMode === Scene.profile ? styles.container__section : styles.container__sectionHidden}>
        <div className={styles.container__title}>Profile</div>
        <GuideProfileData profileData={guideProfileData} profile={guideProfile} />
      </div>
      <div className={sceneMode === Scene.activeOffers ? styles.container__section : styles.container__sectionHidden}>
        <GuideProfileActiveOffers />
      </div>
      <div className={sceneMode === Scene.ratedOffers ? styles.container__section : styles.container__sectionHidden}>
        <GuideProfileActiveOffers />
      </div>
      <GuideProfileMenu setScene={setSceneMode} />
    </div>
  );
};

export default GuideProfile;
