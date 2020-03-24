import { Form, FormikProps, withFormik } from 'formik';
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
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200
      }
    },
    textField: {
      width: 200
    }
  })
);

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/, `${i18n.t('Input is not valid')}!`)
    .required(`${i18n.t('First name is required')}!`),
  lastName: Yup.string()
    .matches(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/, `${i18n.t('Input is not valid')}!`)
    .required(`${i18n.t('Last name is required')}!`),
  telephone: Yup.string()
    .matches(/^[0-9]{2}\s?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/, `${i18n.t('Phone format example +48 XXX XXX XXX')}`)
    .required(`${i18n.t('Telephone number is required')}!`),
  age: Yup.string()
    .matches(/^[1-9]{1}\s?[0-9]{1}$/, `${i18n.t('Input is not valid')}!`)
    .required(`${i18n.t('Age is required')}!`)
});

const InnerForm = (props: FormikProps<FullFormValues> & IRegisterFormProps) => {
  const { t } = useTranslation();

  const [ageArray, setAgeArray] = useState<number[]>([]);
  const [interests, setInterests] = useState([]);

  const { errors, isSubmitting, values } = props;
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

  const classes = useStyles();

  return (
    <Form className={`${classes.root} ${styles.form}`}>
      <div className={styles.case}>
        <TextField
          error={errors.firstName !== undefined}
          id='firstName'
          type='text'
          name='firstName'
          label={t('First name')}
          onChange={e => {
            props.setFieldValue('firstName', e.target.value);
          }}
          helperText={t(errors.firstName || '')}
          className={classes.textField}
          style={{ margin: 0 }}
        />
        <TextField
          error={!!errors.firstName}
          id='lastName'
          type='text'
          name='lastName'
          label={t('Last name')}
          onChange={e => {
            props.setFieldValue('lastName', e.target.value);
          }}
          helperText={t(errors.lastName || '')}
          className={classes.textField}
          style={{ margin: 0 }}
        />
      </div>
      <div className={styles.case}>
        <FormControl>
          <InputLabel htmlFor='country'>{t('Country')}</InputLabel>
          <Select
            native
            id='country'
            name='country'
            value={values.country}
            onChange={(event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
              props.setFieldValue('country', event.target.value);
            }}
            className={classes.textField}
          >
            {countryCodes.map(country => (
              <option key={country.code} value={country.code}>
                {t(country.name)}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <TextField
            error={!!errors.telephone}
            id='telephone'
            type='text'
            name='telephone'
            label={t('Phone')}
            onChange={e => props.setFieldValue('telephone', e.target.value)}
            helperText={t(errors.telephone || '')}
            InputProps={{
              startAdornment: <InputAdornment position='start'>+</InputAdornment>
            }}
            className={classes.textField}
            style={{ margin: 0 }}
          />
        </FormControl>
      </div>
      <div className={styles.case}>
        <FormControl>
          <InputLabel htmlFor='age'>{t('Age')}</InputLabel>
          <Select
            native
            id='age'
            name='age'
            value={values.age}
            onChange={(event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
              props.setFieldValue('age', event.target.value);
            }}
            className={classes.textField}
          >
            {ageArray.map((age: number) => (
              <option key={age} value={age} className={styles.userForm__option}>
                {age}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor='gender'>{t('Gender')}</InputLabel>
          <Select
            native
            id='gender'
            name='gender'
            value={values.gender}
            onChange={(event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
              props.setFieldValue('gender', event.target.value);
            }}
            className={classes.textField}
          >
            <option value='FEMALE'>{t('Female')}</option>
            <option value='MALE'>{t('Male')}</option>
          </Select>
        </FormControl>
      </div>
      <div className={styles.case}>
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
      <p className={styles.title}>{t('Interests')}</p>
      <ul className={styles.tagList}>
        {interests.map((interest: IInterest) => (
          <li key={interest.id} className={styles.tagElement}>
            <label htmlFor={interest.name}>
              <Checkbox id='interests' name='interests' value={interest.name} valueKey={interest.id} />
            </label>
          </li>
        ))}
      </ul>
      <Button variant='contained' color='primary' className={styles.submitButton} type='submit' disabled={!!Object.keys(errors).length}>
        {props.register ? t('Register') : t('Update')}
      </Button>
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
