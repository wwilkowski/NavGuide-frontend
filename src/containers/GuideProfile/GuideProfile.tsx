import React, { useState } from 'react';
import styles from './GuideProfile.module.scss';
import GuideProfileMenu from '../../components/GuideProfileMenu/GuideProfileMenu';
import GuideProfileData from '../../components/GuideProfile/GuideProfileData';
import { StoreType } from '../../store';
import { useSelector } from 'react-redux';

enum Scene {
  profile,
  activeOffers,
  ratedOffers
}

const GuideProfile = () => {
  const [sceneMode, setSceneMode] = useState<Scene>(Scene.profile);

  const guideProfileData = useSelector((state: StoreType) => state.guideProfile.guideProfileData);

  return (
    <div className={styles.container}>
      <div className={sceneMode === Scene.profile ? styles.container__section : styles.container__sectionHidden}>
        <GuideProfileData profileData={guideProfileData} />
      </div>
      <div className={sceneMode === Scene.activeOffers ? styles.container__section : styles.container__sectionHidden}>Active Offers</div>
      <GuideProfileMenu setScene={setSceneMode} />
    </div>
  );
};

export default GuideProfile;
