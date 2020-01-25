import React from 'react';
import { FormikProps, withFormik, Form, Field } from 'formik';
import i18n from '../../locales/i18n';
import styles from '../TripBrowser/ListTrips.module.scss';
import { ISettleGuideRequestFormValues, ISettleGuideRequestFormProps } from './types';

const InnerForm = (props: FormikProps<ISettleGuideRequestFormValues> & ISettleGuideRequestFormProps) => {
  const options = ['REJECT', 'ACCEPT'];

  return (
    <div style={{ boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 5px 0 rgba(0, 0, 0, 0.14)' }}>
      <Form autoComplete='off' style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={{ width: '33%', padding: '1rem' }}>
          <label htmlFor='id'>{i18n.t('ID')}: </label>
          <Field style={{ width: '75%' }} id='id' name='id' as='select'>
            {props.availableIDs.map((id: number) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </Field>
        </div>
        <div style={{ width: '33%', padding: '1rem' }}>
          <label htmlFor='status'>{i18n.t('Status')}: </label>
          <Field style={{ width: '75%' }} as='select' id='status' name='status'>
            <option>{i18n.t('Choose one')}...</option>
            {options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Field>
        </div>
        <div style={{ width: '33%', padding: '1rem' }}>
          <label htmlFor='message'>{i18n.t('Message')}: </label>
          <Field id='message' name='message' type='text' />
        </div>
        <button style={{ width: '25%', margin: '0.5rem' }} type='submit'>
          OK
        </button>
      </Form>
    </div>
  );
};

const MyForm = withFormik<ISettleGuideRequestFormProps, ISettleGuideRequestFormValues>({
  mapPropsToValues: (props: ISettleGuideRequestFormProps) => {
    return {
      id: 0,
      status: '',
      message: '...'
    };
  },

  handleSubmit: (values: ISettleGuideRequestFormValues, { props }) => {
    const { onSubmit } = props;
    console.log(values);
    onSubmit(values);
  }
})(InnerForm);

export default MyForm;
