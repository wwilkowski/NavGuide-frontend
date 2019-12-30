import React, { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { IUserData, IUserFormValues } from '../../../shared/types';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import * as actions from '../actions';

interface Props {
  templateUser: IUserData;
  onSubmit: (user: IUserFormValues, toBeGuide: boolean) => void;
}

const RegisterForm = (Component: ComponentType<Props>) => {
  const dispatcher = useDispatch();
  const { t } = useTranslation();
  const registrationData = useSelector((state: StoreType) => state.registration);

  const onRegisterFormSubmit = (user: IUserFormValues, toBeGuide: boolean) => {
    dispatcher(actions.confirmSignUpRequest(user, registrationData.registrationToken, toBeGuide));
  };

  return (
    <>
      <h1 className='title'>{t('Register Form')}</h1>
      <Component onSubmit={onRegisterFormSubmit} templateUser={registrationData.templateUser} />
    </>
  );
};

export default RegisterForm;
