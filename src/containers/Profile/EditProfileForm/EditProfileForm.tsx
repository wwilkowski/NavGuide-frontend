import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import UserDataForm from '../../../components/UserDataForm/UserDataForm';
import { IUserFormValues } from '../../../shared/types';
import * as actions from '../actions';

const EditProfileForm = () => {
  const { t } = useTranslation();
  const dispatcher = useDispatch();

  const user = useSelector((state: StoreType) => state.profile.user);

  const onEditProfileFormSubmit = (editUser: IUserFormValues) => {
    console.log(editUser);
    dispatcher(actions.editProfileRequest(editUser, user));
  };

  return (
    <>
      <h1 className='title'>{t('Edit profile Form')}</h1>
      <UserDataForm onSubmit={onEditProfileFormSubmit} templateUser={user} />
    </>
  );
};

export default EditProfileForm;
