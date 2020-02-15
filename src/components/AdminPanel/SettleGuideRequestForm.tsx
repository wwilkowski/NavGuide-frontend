import React from 'react';
import { FormikProps, withFormik, Form, Field } from 'formik';
import i18n from '../../locales/i18n';
import { ISettleGuideRequestFormValues, ISettleGuideRequestFormProps } from './types';
import { showNotification } from '../../helpers/notification';

const InnerForm = (props: FormikProps<ISettleGuideRequestFormValues> & ISettleGuideRequestFormProps) => {
  const options = ['REJECT', 'ACCEPT'];

  const disabled = props.availableIDs.length ? false : true;

  return (
    <div style={{ boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 5px 0 rgba(0, 0, 0, 0.14)' }}>
      <Form autoComplete='off' style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={{ width: '33%', padding: '1rem' }}>
          <label htmlFor='id'>{i18n.t('ID')}: </label>
          <Field style={{ width: '75%' }} id='id' name='id' as='select' disabled={disabled}>
            {props.availableIDs.map((id: number) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </Field>
        </div>
        <div style={{ width: '33%', padding: '1rem' }}>
          <label htmlFor='status'>{i18n.t('Status')}: </label>
          <Field style={{ width: '75%' }} as='select' id='status' name='status' disabled={disabled}>
            <option></option>
            {options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Field>
        </div>
        <div style={{ width: '33%', padding: '1rem' }}>
          <label htmlFor='message'>{i18n.t('Message')}: </label>
          <Field id='message' name='message' type='textarea' disabled={disabled} />
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
      id: props.availableIDs[0] || 0,
      status: '',
      message: ''
    };
  },

  handleSubmit: (values: ISettleGuideRequestFormValues, { props }) => {
    const { onSubmit } = props;
    if (values.id && values.message && values.status) onSubmit(values);
    else showNotification('warning', i18n.t('Warning'), i18n.t('Please enter values first!'));
  }
})(InnerForm);

export default MyForm;
