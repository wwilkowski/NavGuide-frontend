import React from 'react';
import { ICreateAgreementOtherProps, ICreateAgreementFormValues } from './types';
import { FormikProps, Form, withFormik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import i18n from '../../../locales/i18n';
import history from '../../../history';

const CreateAgreementSchema = Yup.object().shape({
  description: Yup.string()
    .min(10, i18n.t('Min. number of characters is 10'))
    .required(i18n.t('Description is required!')),
  price: Yup.number()
    .min(1, i18n.t('Min. price is 1'))
    .required(i18n.t('Price is required'))
});

const InnerForm = (props: ICreateAgreementOtherProps & FormikProps<ICreateAgreementFormValues>) => {
  const { t } = useTranslation();

  //propUserId propOfferId (in props, but never used)
  const { touched, errors, values } = props;

  return (
    <Form>
      <label htmlFor='plannedDate'>{i18n.t('Select date')}</label>
      <div>
        <DatePicker
          dateFormat='yyyy/MM/dd hh:mm'
          showTimeSelect
          showTimeInput
          selected={values.plannedDate}
          onChange={date => props.setFieldValue('plannedDate', date)}
        ></DatePicker>
      </div>
      <div>
        <TextField
          id='price'
          type='text'
          name='price'
          label={t('Price')}
          value={values.price}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleChange(event)}
        />
        {errors.price && touched.price && <div>{t(errors.price)}</div>}
      </div>
      <label htmlFor='description'>{t('Description')}</label>
      <div>
        <textarea
          id='description'
          value={values.description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.handleChange(event)}
        />
        {errors.description && touched.description && <div>{t(errors.description)}</div>}
      </div>
      <div>
        <Button variant='contained' color='primary' type='submit'>
          {t('Create Agreement')}
        </Button>
      </div>
    </Form>
  );
};

const CreateAgreementForm = withFormik<ICreateAgreementOtherProps, ICreateAgreementFormValues>({
  mapPropsToValues: (props: ICreateAgreementOtherProps) => {
    return {
      offerId: props.propOfferId,
      description: '',
      userId: props.propUserId,
      plannedDate: new Date(),
      price: 0
    };
  },
  validationSchema: CreateAgreementSchema,
  handleSubmit: (values, { props }) => {
    props.createAgreementClick(values.description, values.plannedDate, values.price);
    history.goBack();
  }
})(InnerForm);

export default CreateAgreementForm;
