import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';
import { IUserFormValues } from '../../../shared/types';
import UserDataForm from '../../../components/UserDataForm/UserDataForm';
import { StoreType } from '../../../store';
import AvatarForm from '../../../components/AvatarForm/AvatarForm';

const EditProfile = () => {
  const dispatcher = useDispatch();

  const user = useSelector((state: StoreType) => state.profile.user);

  const onSubmit = (editUser: IUserFormValues) => {
    dispatcher(actions.editProfileRequest(editUser, user));
  };

  return (
    <>
      <AvatarForm />
      <UserDataForm templateUser={user} register={false} onSubmit={onSubmit} />
    </>
  );
};

export default EditProfile;
