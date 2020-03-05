import React, { ComponentType, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IUserData, IUserFormValues } from '../../../shared/types';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import * as actions from '../actions';

interface Props {
  templateUser: IUserData;
  onSubmit: (user: IUserFormValues) => void;
}

const RegisterForm = (Component: ComponentType<Props>) => {
  const dispatcher = useDispatch();
  const { t } = useTranslation();
  const registrationData = useSelector((state: StoreType) => state.registration);
  const [toBeGuide, setToBeGuide] = useState(false);

  const onRegisterFormSubmit = (user: IUserFormValues) => {
    dispatcher(actions.confirmSignUpRequest(user, registrationData.registrationToken, toBeGuide));
  };

  return (
    <>
      <h1 className='title'>{t('Register Form')}</h1>
      <label htmlFor='toBeGuide'>
        {t('I want to be a guide too')}
        <input id='toBeGuide' type='checkbox' checked={toBeGuide} onChange={() => setToBeGuide(prev => !prev)} />
      </label>
      <Component onSubmit={onRegisterFormSubmit} templateUser={registrationData.templateUser} />
    </>
  );
};

export default RegisterForm;
