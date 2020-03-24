import React, { useEffect } from 'react';
import { FormikProps, withFormik, Form, Field } from 'formik';
import i18n from '../../locales/i18n';
import { ISettleGuideRequestFormValues, ISettleGuideRequestFormProps } from './types';
import { showNotification } from '../../helpers/notification';
import styles from './SettleGuideRequestForm.module.scss';
import history from '../../history';

const InnerForm = (props: FormikProps<ISettleGuideRequestFormValues> & ISettleGuideRequestFormProps) => {
  const options = ['REJECT', 'ACCEPT'];

  const disabled = props.availableIDs.length ? false : true;

  useEffect(() => {
    props.setFieldValue('id', props.availableIDs[0]);
  }, [props.availableIDs, props]);

  return (
    <div className={styles.formContainer}>
      <Form className={styles.form} autoComplete='off'>
        <div className={styles.formField}>
          <label htmlFor='id'>{i18n.t('ID')}: </label>
          <Field className={styles.formField__input} id='id' name='id' as='select' disabled={disabled}>
            {props.availableIDs.map((id: number) => (
              <option key={id} value={id} onClick={() => props.setFieldValue('id', id)}>
                {id}
              </option>
            ))}
          </Field>
        </div>
        <div className={styles.formField}>
          <label htmlFor='status'>{i18n.t('Status')}: </label>
          <Field className={styles.formField__input} as='select' id='status' name='status' disabled={disabled}>
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
          <Field className={styles.formField__input} id='message' name='message' type='textarea' disabled={disabled} />
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
      id: props.availableIDs[0] || 0,
      status: '',
      message: ''
    };
  },

  handleSubmit: (values: ISettleGuideRequestFormValues, { props }) => {
    const { onSubmit } = props;
    console.log(props.availableIDs);
    if (values.id && values.message && values.status) {
      onSubmit(values);
      history.push('/admin');
    } else showNotification('warning', i18n.t('Warning'), i18n.t('Please enter values first!'));
  }
})(InnerForm);

export default MyForm;
