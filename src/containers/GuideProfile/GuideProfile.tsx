import React, { useState, useEffect } from 'react';
import styles from './GuideProfile.module.scss';
import GuideProfileMenu from '../../components/GuideProfileMenu/GuideProfileMenu';
import GuideProfileData from '../../components/GuideProfile/GuideProfileData';
import { StoreType } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import GuideProfileActiveOffers from '../../components/GuideProfile/GuideProfileActiveOffers';
import { fetchGuideProfileRequested } from '../../containers/TripBrowser/actions';

enum Scene {
  profile,
  activeOffers,
  ratedOffers
}

const GuideProfile = () => {
  const [sceneMode, setSceneMode] = useState<Scene>(Scene.activeOffers);

  const dispatcher = useDispatch();
  const guideProfileData = useSelector((state: StoreType) => state.guideProfile.guideProfileData);

  useEffect(() => {
    dispatcher(fetchGuideProfileRequested(3));
  }, [dispatcher]);

  return (
    <div className={styles.container}>
      <div className={sceneMode === Scene.profile ? styles.container__section : styles.container__sectionHidden}>
        <div className={styles.container__title}>Profile</div>
        <GuideProfileData profileData={guideProfileData} />
      </div>
      <div className={sceneMode === Scene.activeOffers ? styles.container__section : styles.container__sectionHidden}>
        <GuideProfileActiveOffers />
      </div>
      <div className={sceneMode === Scene.ratedOffers ? styles.container__section : styles.container__sectionHidden}>Rated Offers</div>
      <GuideProfileMenu setScene={setSceneMode} />
    </div>
  );
};

export default GuideProfile;
