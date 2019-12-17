import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { IUserData } from '../../containers/Registration/types';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import i18n from '../../locales/i18n';

export interface FormValues {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  tel: string;
  gender: string;
  experience: number;
}

const regex = {
  firstName: /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/,
  lastName: /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/,
  country: /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/,
  phone: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(regex.firstName, i18n.t('Input is not valid!'))
    .required('First name is required!'),
  lastName: Yup.string()
    .matches(regex.lastName, i18n.t('Input is not valid!'))
    .required('Last name is required!'),
  country: Yup.string()
    .matches(regex.country, i18n.t('Input is not valid!'))
    .required('Country is required!'),
  tel: Yup.string()
    .matches(regex.phone, i18n.t('Input is not valid!'))
    .required('Telephone number is required!')
});

const InnerForm = (props: FormikProps<FormValues>) => {
  const { t } = useTranslation();
  const { touched, errors, isSubmitting } = props;

  useEffect(() => {
    if (Object.keys(errors).length !== 0 && isSubmitting) {
      Object.values(errors).forEach(error => {
        NotificationManager.warning(t(`${error}`), t('Form warning'));
      });
    }
  }, [errors, isSubmitting, t]);

  return (
    <Form>
      <h1>{t('Register Form')}</h1>
      <label htmlFor='firstName'>{t('First name')}</label>
      <Field id='firstName' type='text' name='firstName' />
      {errors.firstName && touched.firstName && <div>{t(errors.firstName)}</div>}

      <label htmlFor='lastName'>{t('Last name')}</label>
      <Field id='lastName' type='text' name='lastName' />
      {errors.lastName && touched.lastName && <div>{t(errors.lastName)}</div>}

      <label htmlFor='country'>{t('Country')}</label>
      <Field id='country' type='text' name='country' />
      {errors.country && touched.country && <div>{t(errors.country)}</div>}

      <label htmlFor='tel'>{t('Tel.')}</label>
      <Field id='tel' type='text' name='tel' />
      {errors.tel && touched.tel && <div>{t(errors.tel)}</div>}

      <label htmlFor='gender'>{t('Gender')}</label>
      <Field as='select' id='gender' name='gender'>
        <option value='male'>{t('Male')}</option>
        <option value='female'>{t('Female')}</option>
      </Field>

      <label htmlFor='experience'>{t('Experience')}</label>
      <Field as='select' id='experience' name='experience'>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </Field>

      <button type='submit' disabled={isSubmitting}>
        {t('Submit')}
      </button>
    </Form>
  );
};

interface MyFormProps {
  user: IUserData;
  onSubmit: (user: FormValues) => void;
}

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props: MyFormProps) => {
    const { firstName, lastName, country, email, tel, gender, experience } = props.user;
    return {
      firstName: firstName || '',
      lastName: lastName || '',
      country: country || '',
      email: email || '',
      tel: tel || '',
      gender: gender || '',
      experience: experience || 1
    };
  },
  validationSchema: SignupSchema,

  handleSubmit: (values: FormValues, { props }) => {
    props.onSubmit({ ...values });
  }
})(InnerForm);

export default MyForm;
