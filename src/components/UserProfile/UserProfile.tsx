import React from 'react';
import { ITemplate } from '../../containers/Profile/types';

interface Props {
  user: ITemplate;
}

const UserProfile = ({ user }: Props) => {
  return (
    <div>
      <img src={user.avatar} alt='' />
      <p>
        {user.firstName} {user.lastName}
      </p>
      <p>{user.email}</p>
      <p>Experience: {user.experience}</p>
      <p>Country: {user.country}</p>
      <p>Tel: {user.telephone}</p>
      <p>Interests:</p>
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
