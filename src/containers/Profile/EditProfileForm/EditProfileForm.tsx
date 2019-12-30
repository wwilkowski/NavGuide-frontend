import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StoreType } from '../../../store';
import UserDataForm from '../../../components/UserDataForm/UserDataForm';
import { IUserFormValues } from '../../../shared/types';

const EditProfileForm = () => {
  const { t } = useTranslation();
  const user = useSelector((state: StoreType) => state.profile.user);

  const onEditProfileFormSubmit = (user: IUserFormValues, toBeGuide: boolean) => {
    alert(user);
  };

  return (
    <>
      <h1 className='title'>{t('Edit profile Form')}</h1>
      <UserDataForm onSubmit={onEditProfileFormSubmit} templateUser={user} />
    </>
  );
};

export default EditProfileForm;
