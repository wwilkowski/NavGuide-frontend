import React from 'react';
import { withFormik, FormikProps, Field } from 'formik';
import * as types from './types';
import Checkbox from '../../shared/Checkbox';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import styles from './GuideRegisterForm.module.scss';
import experienceStyles from '../../shared/Experience.module.scss';
import userStyles from '../UserDataForm/UserDataForm.module.scss';
import i18n from '../../locales/i18n';

const GuideFormSchema = Yup.object().shape({
  description: Yup.string()
    .matches(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/, i18n.t('Input is not valid!'))
    .required('Description is required!'),
  languages: Yup.array().min(1)
});

const MyForm = (props: FormikProps<types.FormValues>) => {
  const { t } = useTranslation();
  const { handleSubmit } = props;
  const allLanguages = [
    {
      name: 'Polish',
      code: 'PL'
    },
    {
      name: 'English',
      code: 'EN'
    },
    {
      name: 'German',
      code: 'DE'
    }
  ];
  const { touched, errors } = props;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('Become a guide')}</h2>
      <form onSubmit={handleSubmit}>
        <div className={userStyles.userForm__case}>
          <label className={userStyles.userForm__label}>{t('Languages')}</label>
          <ul className={userStyles.userForm__tagList}>
            {allLanguages
              ? allLanguages.map(lang => (
                  <li key={lang.code} className={userStyles.userForm__tagElement}>
                    <label key={lang.code} htmlFor={lang.code}>
                      <Checkbox id='languages' name='languages' value={lang.name} valueKey={lang.code} />
                    </label>
                  </li>
                ))
              : null}
            {errors.languages && touched.languages && <div className={userStyles.userForm__warning}>{t(errors.languages)}</div>}
          </ul>
        </div>
        <div className={userStyles.userForm__case}>
          <label htmlFor='experience' className={userStyles.userForm__label}>
            {t('Experience')}
          </label>
          <fieldset name='experience' className={experienceStyles.rate}>
            <input type='radio' id='5' name='rating' value='5' onChange={() => props.setFieldValue('experience', 5)} />
            <label htmlFor='5' title='Awesome - 5 stars'></label>
            <input type='radio' id='4' name='rating' value='4' onChange={() => props.setFieldValue('experience', 4)} />
            <label htmlFor='4' title='Pretty good - 4 stars'></label>
            <input type='radio' id='3' name='rating' value='3' onChange={() => props.setFieldValue('experience', 3)} />
            <label htmlFor='3' title='Meh - 3 stars'></label>
            <input type='radio' id='2' name='rating' value='2' onChange={() => props.setFieldValue('experience', 2)} />
            <label htmlFor='2' title='Kinda bad - 2 stars'></label>
            <input type='radio' id='1' name='rating' value='1' onChange={() => props.setFieldValue('experience', 1)} />
            <label htmlFor='1' title='Really bad - 1 star'></label>
          </fieldset>
        </div>
        <div className={userStyles.userForm__case}>
          <label htmlFor='description' className={userStyles.userForm__label}>
            {t('Describe yourself')}
            <Field as='textarea' id='description' name='description' className={userStyles.userForm__textarea} />
          </label>
          {errors.description && touched.description && <div className={userStyles.userForm__warning}>{t(errors.description)}</div>}
        </div>

        <button type='submit' className={userStyles.userForm__submitButton} onSubmit={e => {}}>
          {t('Submit')}
        </button>
      </form>
    </div>
  );
};

const MyEnhancedForm = withFormik<types.MyFormProps, types.FormValues>({
  mapPropsToValues: () => ({
    languages: [],
    experience: 1,
    description: ''
  }),
  validationSchema: GuideFormSchema,
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(false);
    props.onSubmit(values);
  }
})(MyForm);

export default MyEnhancedForm;
