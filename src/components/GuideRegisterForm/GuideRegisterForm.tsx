import React from 'react';
import { withFormik, FormikProps, Field } from 'formik';
import * as types from './types';
import Checkbox from '../../shared/Checkbox';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import styles from './GuideRegisterForm.module.scss';
import experienceStyles from '../../shared/Experience.module.scss';
import i18n from '../../locales/i18n';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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
  const { touched, errors, values } = props;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('Become a guide')}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.langCase}>
          <label className={styles.label}>{t('Languages')}</label>
          <ul className={styles.langList}>
            {allLanguages
              ? allLanguages.map(lang => (
                  <li key={lang.code}>
                    <label key={lang.code} htmlFor={lang.code}>
                      <Checkbox id='languages' name='languages' value={lang.name} valueKey={lang.code} />
                    </label>
                  </li>
                ))
              : null}
            {errors.languages && touched.languages && <div>{t(errors.languages)}</div>}
          </ul>
        </div>
        <div className={styles.experienceCase}>
          <label htmlFor='experience' className={styles.label}>
            {t('Experience')}
          </label>
          <fieldset name='experience' className={experienceStyles.rate}>
            <input type='radio' id='5' name='rating' value='5' onChange={() => props.setFieldValue('experience', 5)} />
            <label htmlFor='5' title={t('I was once a guide')}></label>
            <input type='radio' id='4' name='rating' value='4' onChange={() => props.setFieldValue('experience', 4)} />
            <label htmlFor='4' title='I give tours regularly'></label>
            <input type='radio' id='3' name='rating' value='3' onChange={() => props.setFieldValue('experience', 3)} />
            <label htmlFor='3' title='I organize trips on average once a month'></label>
            <input type='radio' id='2' name='rating' value='2' onChange={() => props.setFieldValue('experience', 2)} />
            <label htmlFor='2' title='Sometimes, I show something for friends'></label>
            <input type='radio' id='1' name='rating' value='1' onChange={() => props.setFieldValue('experience', 1)} />
            <label htmlFor='1' title='I am a newcomer in guiding'></label>
          </fieldset>
        </div>
        <div className={styles.descCase}>
          <label htmlFor='description' className={styles.label}>
            {t('Describe yourself')}:
          </label>
          <TextareaAutosize
            aria-label='empty textarea'
            placeholder=''
            value={values.description}
            rowsMin={4}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.setFieldValue('description', e.target.value)}
            className={styles.textarea}
          />
          {errors.description && touched.description && <div>{t(errors.description)}</div>}
        </div>

        <Button variant='contained' color='primary' type='submit'>
          {t('Submit')}
        </Button>
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
