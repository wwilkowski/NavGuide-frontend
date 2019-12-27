import { Field, Form, FormikProps, withFormik } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import countryCodes from '../../helpers/countryCodes.json';
import { showNotification } from '../../helpers/notification';
import i18n from '../../locales/i18n';
import Checkbox from '../../shared/Checkbox';
import { StoreType } from '../../store';
import { MyFormProps, FullFormValues } from './types';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/, i18n.t('Input is not valid!'))
    .required('First name is required!'),
  lastName: Yup.string()
    .matches(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/, i18n.t('Input is not valid!'))
    .required('Last name is required!'),
  telephone: Yup.string()
    .matches(/^\d{9}$/, i18n.t('Input is not valid!'))
    .required('Telephone number is required!')
});

const InnerForm = (props: FormikProps<FullFormValues>) => {
  const { t } = useTranslation();
  const interests = useSelector((state: StoreType) => state.registration.interests);

  const { touched, errors, isSubmitting } = props;

  useEffect(() => {
    if (Object.keys(errors).length !== 0 && isSubmitting) {
      Object.values(errors).forEach(error => {
        showNotification('warning', t('Form warning'), t(`${error}`));
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
              <option key={country.code} value={country.code}>
                {t(country.name)}
              </option>
            ))}
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
              <option value='AMBASSADOR'>{t('ambassador')}</option>
              <option value='EXPERT'>{t('expert')}</option>
              <option value='ADEPT'>{t('adept')}</option>
              <option value='COMPETENT'>{t('competent')}</option>
              <option value='EXPERIENCED'>{t('experienced')}</option>
              <option value='NOVICE'>{t('novice')}</option>
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

        <div className='field'>
          <label className='checkbox' htmlFor={'toBeGuide'}>
            {t('I want to be a guide')}
            <Field id={'toBeGuide'} name='toBeGuide' type='checkbox' checked={props.values.toBeGuide} />
          </label>
        </div>

        <button className='button is-primary' type='submit' disabled={isSubmitting}>
          {t('Submit')}
        </button>
      </Form>
    </div>
  );
};

const MyForm = withFormik<MyFormProps, FullFormValues>({
  mapPropsToValues: (props: MyFormProps) => {
    const { firstName, lastName, country, email, telephone, gender, experience } = props.templateUser;
    return {
      firstName: firstName || '',
      lastName: lastName || '',
      country: country.toUpperCase() || 'PL',
      email: email || '',
      telephone: telephone || '',
      gender: gender || '',
      experience: experience || 'NOVICE',
      interests: [],
      toBeGuide: false
    };
  },
  validationSchema: SignupSchema,

  handleSubmit: (values: FullFormValues, { props }) => {
    const { toBeGuide, ...user } = values;
    props.onSubmit(user, toBeGuide);
  }
})(InnerForm);

export default MyForm;
