import React, { useEffect, useState } from 'react';
import { IListGuideRequestProps } from './types';
import * as types from '../../containers/AdminPanel/types';
import styles from './ListGuideRequests.module.scss';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import GuideRequest from './GuideRequest';
import { IUserProfile } from '../../containers/User/types';

const ListGuideRequests = (props: IListGuideRequestProps) => {
  const { guideRequests } = props;

  const userProfilesData = useSelector((state: StoreType) => state.user.users);

  const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);

  useEffect(() => {
    setUserProfiles(userProfilesData);
  }, []);

  return (
    <div className={styles.requestsContainer}>
      {guideRequests.map((req: types.IGuideRequest) => {
        var userProfile: IUserProfile = userProfiles[0];
        userProfiles.forEach((user: IUserProfile) => {
          if (user.id === req.userId) {
            userProfile = user;
            return;
          }
        });

        return (
          <div key={req.id}>
            <GuideRequest guideRequest={req} userProfile={userProfile} />
          </div>
        );
      })}
    </div>
  );
};

export default ListGuideRequests;
