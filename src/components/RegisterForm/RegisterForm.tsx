import React from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { UserDataType } from '../../containers/Registration/types';
import { useTranslation } from 'react-i18next';

export interface FormValues {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  tel: string;
  gender: string;
  experience: number;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(5, 'Too short!')
    .max(45, 'Too long!')
    .required('Required!'),
  lastName: Yup.string()
    .min(5, 'Too short!')
    .max(45, 'Too long!')
    .required('Required!'),
  country: Yup.string()
    .min(2, 'Too short!')
    .max(45, 'Too long!')
    .required('Required!'),
  email: Yup.string()
    .email()
    .required(),
  tel: Yup.string()
    .min(5, 'Too short!')
    .max(45, 'Too long!')
    .required('Required!')
});

const InnerForm = (props: FormikProps<FormValues>) => {
  const { t } = useTranslation();
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <h1>{t('Register Form')}</h1>
      <label htmlFor='firstName'>{t('First name')}</label>
      <Field id='firstName' type='text' name='firstName' />
      {touched.firstName && errors.firstName && <div>{errors.firstName}</div>}

      <label htmlFor='lastName'>{t('Last name')}</label>
      <Field id='lastName' type='text' name='lastName' />
      {touched.lastName && errors.lastName && <div>{errors.lastName}</div>}

      <label htmlFor='country'>{t('Country')}</label>
      <Field id='country' type='text' name='country' />
      {touched.country && errors.country && <div>{errors.country}</div>}

      <label htmlFor='email'>{t('Email')}</label>
      <Field id='email' type='text' name='email' />
      {touched.email && errors.email && <div>{errors.email}</div>}

      <label htmlFor='tel'>{t('Tel.')}</label>
      <Field id='tel' type='text' name='tel' />
      {touched.tel && errors.tel && <div>{errors.tel}</div>}

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
  user: UserDataType;
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
