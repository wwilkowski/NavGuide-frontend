import React from 'react';
import { withFormik, FormikProps, Field } from 'formik';
import * as types from './types';
import Checkbox from '../../shared/Checkbox';
import { useTranslation } from 'react-i18next';

const MyForm = (props: FormikProps<types.FormValues>) => {
  const { t } = useTranslation();
  const { handleSubmit } = props;
  const allLanguages = ['polish', 'english', 'turkish']; //PL EN TR
  return (
    <form onSubmit={handleSubmit}>
      <label className='label'>{t('Languages')}</label>
      <div className='field is-mobile'>
        {allLanguages.map(lang => (
          <label key={lang} className='checkbox column' htmlFor={lang}>
            <Checkbox id='languages' name='languages' value={lang} valueKey={lang} />
          </label>
        ))}
      </div>
      <div className='field column'>
        <label className='label' htmlFor='experience'>
          {t('Experience')}
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
        </label>
      </div>
      <div className='column'>
        <label className='label' htmlFor='description'>
          {t('Describe yourself')}
          <Field className='column' as='textarea' id='description' name='description' />
        </label>
      </div>

      <button className='button is-primary' type='submit'>
        {t('Submit')}
      </button>
    </form>
  );
};

const MyEnhancedForm = withFormik<types.MyFormProps, types.FormValues>({
  mapPropsToValues: () => ({
    languages: [],
    experience: 'NOVICE',
    description: ''
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    /*setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);*/

    setSubmitting(false);
    props.onSubmit(values);
  }
})(MyForm);

export default MyEnhancedForm;
