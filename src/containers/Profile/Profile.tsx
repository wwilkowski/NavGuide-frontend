import React from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';

const Profile = () => {
  const user = useSelector((state: StoreType) => state.profile.user);
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

export default Profile;
