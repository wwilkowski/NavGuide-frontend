import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';
import { IUserFormValues } from '../../../shared/types';
import UserDataForm from '../../../components/UserDataForm/UserDataForm';
import { StoreType } from '../../../store';
import AvatarForm from '../../../components/AvatarForm/AvatarForm';
import { Redirect } from 'react-router-dom';
import { showNotification } from '../../../helpers/notification';

const EditProfile = () => {
  const dispatcher = useDispatch();

  const user = useSelector((state: StoreType) => state.profile);

  useEffect(() => {
    if (!user.isLoggedIn) showNotification('info', 'Information', 'You do not have permission to this content');
  }, [user]);

  const onSubmit = (editUser: IUserFormValues) => {
    dispatcher(actions.editProfileRequest(editUser, user.user));
  };

  return (
    <>
      {user.isLoggedIn ? (
        <div>
          <AvatarForm />
          <UserDataForm templateUser={user.user} register={false} onSubmit={onSubmit} />
        </div>
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default EditProfile;
