import React from 'react';
import { IUserData } from '../../shared/types';
import { useTranslation } from 'react-i18next';

interface Props {
  user: IUserData;
}

const UserProfile = ({ user }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <img src={user.avatar} alt='' />
      <p>
        {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <p>
        {t(`Experience`)}: {user.experience}
      </p>
      <p>
        {t(`Country`)}: {user.country}
      </p>
      <p>Tel: {user.telephone}</p>
      <p>{t(`Interests`)}:</p>
      <ul>
        {user.interests.map((interest, index) => (
          <li key={index}>
            <p>{interest.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
