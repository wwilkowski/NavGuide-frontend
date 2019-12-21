import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { IUserData } from '../../containers/Registration/types';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import i18n from '../../locales/i18n';
import Checkbox from '../../shared/Checkbox';
import { StoreType } from '../../store';
import countryCodes from '../../helpers/countryCodes.json';

export interface FormValues {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  telephone: string;
  gender: string;
  experience: string;
  interests: number[];
}

const regex = {
  firstName: /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/,
  lastName: /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/,
  country: /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/,
  telephone: /^\d{9}$/
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(regex.firstName, i18n.t('Input is not valid!'))
    .required('First name is required!'),
  lastName: Yup.string()
    .matches(regex.lastName, i18n.t('Input is not valid!'))
    .required('Last name is required!'),
  telephone: Yup.string()
    .matches(regex.telephone, i18n.t('Input is not valid!'))
    .required('Telephone number is required!')
});

const InnerForm = (props: FormikProps<FormValues>) => {
  const { t } = useTranslation();
  const interests = useSelector((state: StoreType) => state.registration.interests);

  const { touched, errors, isSubmitting } = props;
  useEffect(() => {
    if (Object.keys(errors).length !== 0 && isSubmitting) {
      Object.values(errors).forEach(error => {
        NotificationManager.warning(t(`${error}`), t('Form warning'));
      });
    }
  }, [errors, isSubmitting, t]);
  return (
    <div className='section'>
      <Form>
        <h1 className='title'>{t('Register Form')}</h1>
        <div className='field'>
          <label className='label' htmlFor='firstName'>
            {t('First name')}
          </label>
          <Field className='input' id='firstName' type='text' name='firstName' />
          {errors.firstName && touched.firstName && <div>{t(errors.firstName)}</div>}
        </div>

        <div className='field'>
          <label className='label' htmlFor='lastName'>
            {t('Last name')}
          </label>
          <Field className='input' id='lastName' type='text' name='lastName' />
          {errors.lastName && touched.lastName && <div>{t(errors.lastName)}</div>}
        </div>
        <div className='select is-multiple'>
          <label className='label' htmlFor='country'>
            {t('Country')}
          </label>
          <Field as='select' id='country' name='country'>
            {countryCodes.map(country => (
              <option value={country.code}>{t(country.name)}</option>
            ))}
            <option value='male'>{t('Male')}</option>
            <option value='female'>{t('Female')}</option>
          </Field>
        </div>

        <div className='field'>
          <label className='label' htmlFor='tel'>
            {t('Telephone')}
          </label>
          <Field className='input' id='telephone' type='text' name='telephone' />
          {errors.telephone && touched.telephone && <div>{t(errors.telephone)}</div>}
        </div>

        <div className='field'>
          <label className='label' htmlFor='gender'>
            {t('Gender')}
          </label>
          <div className='select'>
            <Field as='select' id='gender' name='gender'>
              <option value='male'>{t('Male')}</option>
              <option value='female'>{t('Female')}</option>
            </Field>
          </div>
        </div>

        <div className='field'>
          <label className='label' htmlFor='experience'>
            {t('Experience')}
          </label>
          <div className='select'>
            <Field as='select' id='experience' name='experience'>
              <option value='AMBASSADOR'>ambassador</option>
              <option value='EXPERT'>expert</option>
              <option value='ADEPT'>adept</option>
              <option value='COMPETENT'>competent</option>
              <option value='EXPERIENCED'>experienced</option>
              <option value='NOVICE'>novice</option>
            </Field>
          </div>
        </div>

        <div className='field'>
          {interests.map(interest => (
            <label key={interest.id} className='checkbox' htmlFor={interest.name}>
              <Checkbox id='interests' name='interests' value={interest.name} valueKey={interest.id} />
            </label>
          ))}
        </div>

        <button className='button is-primary' type='submit' disabled={isSubmitting}>
          {t('Submit')}
        </button>
      </Form>
    </div>
  );
};

interface MyFormProps {
  user: IUserData;
  onSubmit: (user: FormValues) => void;
}

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props: MyFormProps) => {
    const { firstName, lastName, country, email, telephone, gender, experience } = props.user;
    return {
      firstName: firstName || '',
      lastName: lastName || '',
      country: country.toUpperCase() || 'PL',
      email: email || '',
      telephone: telephone || '',
      gender: gender || '',
      experience: experience || 'NOVICE',
      interests: []
    };
  },
  validationSchema: SignupSchema,

  handleSubmit: (values: FormValues, { props }) => {
    props.onSubmit({ ...values });
  }
})(InnerForm);

export default MyForm;
