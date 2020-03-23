import React, { ComponentType, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IUserFormValues } from '../../../shared/types';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import * as actions from '../actions';
import styles from './RegisterForm.module.scss';
import PlusIcon from '../../../assets/icons/plus.png';
import { IRegisterFormProps } from '../types';
import Checkbox from '@material-ui/core/Checkbox';

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
      <span className={styles.plusIcon}>
        <img src={PlusIcon} alt='' />
      </span>
      <h1 className={styles.title}>{t('Create Account')}</h1>
      <p className={styles.desc}>{t('Complete the rest informations to set up an account in the application')}.</p>
      <label htmlFor='toBeGuide' className={styles.guideInfo}>
        {t('I want to be a guide')}
        <Checkbox
          color='primary'
          id='toBeGuide'
          style={{ margin: '1rem' }}
          checked={toBeGuide}
          onChange={() => setToBeGuide(prev => !prev)}
        />
      </label>
      <Component onSubmit={onRegisterFormSubmit} templateUser={registrationData.templateUser} register={true} />
    </div>
  );
};

export default RegisterForm;
