import { Field, Form, FormikProps, withFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import countryCodes from '../../helpers/countryCodes.json';
import { showNotification } from '../../helpers/notification';
import i18n from '../../locales/i18n';
import Checkbox from '../../shared/Checkbox';
import { MyFormProps, FullFormValues, IInterest } from './types';
import styles from './UserDataForm.module.scss';
import experienceStyles from '../../shared/Experience.module.scss';
import { IRegisterFormProps } from '../../containers/Registration/types';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/, `${i18n.t('Input is not valid')}!`)
    .required(`${i18n.t('First name is required')}!`),
  lastName: Yup.string()
    .matches(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/, `${i18n.t('Input is not valid')}!`)
    .required(`${i18n.t('Last name is required')}!`),
  telephone: Yup.string()
    .matches(/^[0-9]{2}\s?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/, `${i18n.t('Phone format is not valid')}!`)
    .required(`${i18n.t('Telephone number is required')}!`),
  age: Yup.string()
    .matches(/^[1-9]{1}\s?[0-9]{1}$/, `${i18n.t('Input is not valid')}!`)
    .required(`${i18n.t('Age is required')}!`)
});

const InnerForm = (props: FormikProps<FullFormValues> & IRegisterFormProps) => {
  const { t } = useTranslation();

  const [ageArray, setAgeArray] = useState<number[]>([]);
  const [interests, setInterests] = useState([]);

  const { touched, errors, isSubmitting, values } = props;
  const { experience } = values;

  useEffect(() => {
    if (Object.keys(errors).length !== 0 && isSubmitting) {
      Object.values(errors).forEach(error => {
        showNotification('warning', t('Form warning'), t(`${error}`));
      });
    }
  }, [errors, isSubmitting, t]);

  useEffect(() => {
    const tmp = [];
    for (let i = 10; i < 100; i++) tmp.push(i);
    setAgeArray(tmp);

    async function fetchData() {
      const data = await fetch('https://235.ip-51-91-9.eu/interests');
      const json = await data.json();
      setInterests(json);
    }
    fetchData();
  }, []);

  return (
    <Form className={styles.userForm}>
      <div className={styles.userForm__case}>
        <label htmlFor='firstName' className={styles.userForm__label}>
          {t('First name')}
        </label>
        <Field id='firstName' type='text' name='firstName' className={styles.userForm__input} />
        {errors.firstName && touched.firstName && <div className={styles.userForm__warning}>{t(errors.firstName)}</div>}
      </div>

      <div className={styles.userForm__case}>
        <label htmlFor='lastName' className={styles.userForm__label}>
          {t('Last name')}
        </label>
        <Field id='lastName' type='text' name='lastName' className={styles.userForm__input} />
        {errors.lastName && touched.lastName && <div className={styles.userForm__warning}>{t(errors.lastName)}</div>}
      </div>
      <div className={styles.userForm__case}>
        <label htmlFor='country' className={styles.userForm__label}>
          {t('Country')}
        </label>
        <select
          id='country'
          name='country'
          value={values.country}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            props.setFieldValue('country', event.target.value);
          }}
          className={styles.userForm__input}
        >
          {countryCodes.map(country => (
            <option key={country.code} value={country.code} className={styles.userForm__option}>
              {t(country.name)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.userForm__case}>
        <label htmlFor='tel' className={styles.userForm__label}>
          {t('Phone')}
        </label>
        <div style={{ width: '50%' }}>
          <span>+</span>
          <Field id='telephone' type='text' name='telephone' className={`${styles.userForm__input} ${styles.userForm__telephoneInput}`} />
        </div>
        {errors.telephone && touched.telephone && <div className={styles.userForm__warning}>{t(errors.telephone)}</div>}
      </div>

      <div className={styles.userForm__case}>
        <label htmlFor='age' className={styles.userForm__label}>
          {t('Age')}
        </label>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
          <select
            id='age'
            name='age'
            value={values.age}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              props.setFieldValue('age', event.target.value);
            }}
            className={`${styles.userForm__input}`}
            style={{ width: '100%' }}
          >
            {ageArray.map((age: number) => (
              <option key={age} value={age} className={styles.userForm__option}>
                {age}
              </option>
            ))}
          </select>
        </div>
        {errors.age && touched.age && <div className={styles.userForm__warning}>{t(errors.age)}</div>}
      </div>

      <div className={styles.userForm__case}>
        <label htmlFor='gender' className={styles.userForm__label}>
          {t('Gender')}
        </label>
        <select
          id='gender'
          name='gender'
          value={values.gender}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            props.setFieldValue('gender', e.target.value);
          }}
          className={styles.userForm__input}
        >
          <option value='FEMALE' className={styles.userForm__option}>
            {t('Female')}
          </option>
          <option value='MALE' className={styles.userForm__option}>
            {t('Male')}
          </option>
        </select>
      </div>

      <div className={styles.userForm__case}>
        <label htmlFor='experience' className={styles.userForm__label}>
          {t('Experience in travelling')}
        </label>
        <fieldset name='experience' className={experienceStyles.rate}>
          <input
            type='radio'
            checked={experience === 5}
            id='5'
            name='rating'
            value='5'
            onChange={() => props.setFieldValue('experience', 5)}
          />
          <label htmlFor='5' title={t('I travel constantly')}></label>
          <input
            type='radio'
            checked={experience === 4}
            id='4'
            name='rating'
            value='4'
            onChange={() => props.setFieldValue('experience', 4)}
          />
          <label htmlFor='4' title={t('I travel every few weeks')}></label>
          <input
            type='radio'
            checked={experience === 3}
            id='3'
            name='rating'
            value='3'
            onChange={() => props.setFieldValue('experience', 3)}
          />
          <label htmlFor='3' title={t('I travel every few months')}></label>
          <input
            type='radio'
            checked={experience === 2}
            id='2'
            name='rating'
            value='2'
            onChange={() => props.setFieldValue('experience', 2)}
          />
          <label htmlFor='2' title={t('I travel once a year')}></label>
          <input
            type='radio'
            checked={experience === 1}
            id='1'
            name='rating'
            value='1'
            onChange={() => props.setFieldValue('experience', 1)}
          />
          <label htmlFor='1' title={t('I travel once every few years')}></label>
        </fieldset>
      </div>
      <ul className={styles.userForm__tagList}>
        {interests.map((interest: IInterest) => (
          <li key={interest.id} className={styles.userForm__tagElement}>
            <label htmlFor={interest.name}>
              <Checkbox id='interests' name='interests' value={interest.name} valueKey={interest.id} />
            </label>
          </li>
        ))}
      </ul>
      <button className={styles.userForm__submitButton} type='submit'>
        {props.register ? t('Register') : t('Update')}
      </button>
    </Form>
  );
};

const MyForm = withFormik<MyFormProps, FullFormValues>({
  mapPropsToValues: (props: MyFormProps) => {
    const { firstName, lastName, country, email, telephone, gender, age, experience, interests } = props.templateUser;

    return {
      firstName: firstName || '',
      lastName: lastName || '',
      country: country.toUpperCase() || 'PL',
      email: email || '',
      telephone: telephone || '',
      gender: gender || 'FEMALE',
      age: age || 10,
      experience: experience || 1,
      interests: interests.length ? interests.map(i => i.id) : [],
      avatar: '',
      role: ''
    };
  },
  validationSchema: SignupSchema,

  handleSubmit: (values: FullFormValues, { props }) => {
    const { ...user } = values;
    if (!user.interests) {
      user.interests = [];
    }
    user.telephone = user.telephone.replace(/\s/g, '');
    props.onSubmit(user);
  }
})(InnerForm);

export default MyForm;
