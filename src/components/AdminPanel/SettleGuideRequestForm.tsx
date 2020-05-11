import React from 'react';
import { FormikProps, withFormik, Form, Field } from 'formik';
import i18n from '../../locales/i18n';
import { ISettleGuideRequestFormValues, ISettleGuideRequestFormProps } from './types';
import { showNotification } from '../../helpers/notification';
import styles from './SettleGuideRequestForm.module.scss';
import history from '../../history';

const InnerForm = (props: FormikProps<ISettleGuideRequestFormValues> & ISettleGuideRequestFormProps) => {
  const options = ['REJECT', 'ACCEPT'];

  return (
    <div className={styles.formContainer}>
      <Form className={styles.form} autoComplete='off'>
        <div className={styles.formField}>
          <label htmlFor='status'>{i18n.t('Status')}: </label>
          <Field className={styles.formField__input} as='select' id='status' name='status'>
            <option></option>
            {options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Field>
        </div>
        <div className={styles.formField}>
          <label htmlFor='message'>{i18n.t('Message')}: </label>
          <Field className={styles.formField__input} id='message' name='message' type='textarea' />
        </div>
        <div className={styles.formField}>
          <button type='submit'>OK</button>
        </div>
      </Form>
    </div>
  );
};

const MyForm = withFormik<ISettleGuideRequestFormProps, ISettleGuideRequestFormValues>({
  mapPropsToValues: (props: ISettleGuideRequestFormProps) => {
    return {
      id: props.requestId,
      status: '',
      message: '',
    };
  },

  handleSubmit: (values: ISettleGuideRequestFormValues, { props }) => {
    const { onSubmit } = props;
    if (values.message && values.status) {
      onSubmit(values);
      values.message = '';
      history.push('/admin');
    } else showNotification('warning', i18n.t('Warning'), i18n.t('Please enter message first!'));
  },
})(InnerForm);

export default MyForm;
