import React from 'react';
import { withFormik, FormikProps, Field } from 'formik';
import * as types from './types';
import Checkbox from '../../shared/Checkbox';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
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
    }
  ];
  const { touched, errors } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label className='label'>{t('Languages')}</label>
      <div className='field is-mobile'>
        {allLanguages
          ? allLanguages.map(lang => (
              <label key={lang.code} className='checkbox column' htmlFor={lang.code}>
                <Checkbox id='languages' name='languages' value={lang.name} valueKey={lang.code} />
              </label>
            ))
          : null}
        {errors.languages && touched.languages && <div>{t(errors.languages)}</div>}
      </div>
      <div className='field column'>
        <label className='label' htmlFor='experience'>
          {t('Experience')}
          <div className='select'>
            <Field as='select' id='experience' name='experience'>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </Field>
          </div>
        </label>
      </div>
      <div className='column'>
        <label className='label' htmlFor='description'>
          {t('Describe yourself')}
          <Field className='column' as='textarea' id='description' name='description' />
        </label>
        {errors.description && touched.description && <div>{t(errors.description)}</div>}
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
    experience: '1',
    description: ''
  }),
  validationSchema: GuideFormSchema,
  handleSubmit: (values, { setSubmitting, props }) => {
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 1000);
    setSubmitting(false);
    props.onSubmit(values);
  }
})(MyForm);

export default MyEnhancedForm;
