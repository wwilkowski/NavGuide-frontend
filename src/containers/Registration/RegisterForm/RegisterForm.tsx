import React, { ComponentType, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IUserFormValues } from '../../../shared/types';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import * as actions from '../actions';
import styles from './RegisterForm.module.scss';
import PlusIcon from '../../../assets/icons/plus.png';
import { IRegisterFormProps } from '../types';

const RegisterForm = (Component: ComponentType<IRegisterFormProps>) => {
  const dispatcher = useDispatch();
  const { t } = useTranslation();
  const registrationData = useSelector((state: StoreType) => state.registration);
  const [toBeGuide, setToBeGuide] = useState(false);

  const onRegisterFormSubmit = (user: IUserFormValues) => {
    dispatcher(actions.confirmSignUpRequest(user, registrationData.registrationToken, toBeGuide));
  };

  return (
    <div className={styles.registerForm}>
      <span className={styles.registerForm__plusIcon}>
        <img src={PlusIcon} alt='' />
      </span>
      <h1 className={styles.registerForm__title}>{t('Create Account')}</h1>
      <p className={styles.registerForm__desc}>{t('Complete the rest informations to set up an account in the application')}.</p>
      <label htmlFor='toBeGuide'>
        {t('I want to be a guide')}
        <input id='toBeGuide' type='checkbox' style={{ margin: '1rem' }} checked={toBeGuide} onChange={() => setToBeGuide(prev => !prev)} />
      </label>
      <Component onSubmit={onRegisterFormSubmit} templateUser={registrationData.templateUser} register={true} />
    </div>
  );
};

export default RegisterForm;
