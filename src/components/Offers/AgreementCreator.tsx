import React, { useEffect, useState } from 'react';
import { ICreateAgreementOtherProps, ICreateAgreementFormValues } from './types';
import { FormikProps, Form, withFormik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import i18n from '../../locales/i18n';
import { showNotification } from '../../helpers/notification';
import TripListElement from '../TripBrowser/TripListElement';
import VerifyPopup from '../../shared/VerifyPopup';

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

  const { touched, errors, values } = props;

  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);

  useEffect(() => {
    //const tmp = sessionStorage.getItem('agreementData');
    const tmp = sessionStorage.getItem('agreementData');
    if (tmp) {
      const data = JSON.parse(tmp);
      props.setFieldValue('price', data.price);
      props.setFieldValue('plannedDate', new Date(data.plannedDate));
      props.setFieldValue('description', data.description);
      sessionStorage.removeItem('agreementData');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        onClick={() => {
          const data = {
            price: values.price,
            plannedDate: values.plannedDate,
            description: values.description
          };
          sessionStorage.setItem('agreementData', JSON.stringify(data));
        }}
      >
        <TripListElement trip={props.trip} />
      </div>
      <Form>
        <div>
          <TextField
            id='price'
            type='text'
            name='price'
            label={t('Price') + ' (zł)'}
            value={values.price}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleChange(event)}
          />
          {errors.price && touched.price && <div>{t(errors.price)}</div>}
        </div>
        <label htmlFor='plannedDate'>{i18n.t('Select date')}</label>
        <div>
          <DatePicker
            dateFormat='yyyy/MM/dd hh:mm aa'
            timeFormat='HH:mm'
            timeIntervals={15}
            showTimeSelect
            showTimeInput
            locale='pl-PL'
            minDate={new Date(props.trip.begin)}
            maxDate={new Date(props.trip.end)}
            selected={values.plannedDate}
            onChange={date => props.setFieldValue('plannedDate', date)}
          />
        </div>
        <div>
          <TextField
            id='description'
            label={t('Message to guide')}
            multiline
            rows='4'
            value={values.description}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.handleChange(event)}
            variant='outlined'
          />
          {errors.description && touched.description && <div>{t(errors.description)}</div>}
        </div>
        <div>
          <Button variant='contained' color='primary' onClick={() => setPopupVisibility(true)}>
            {t('Create Agreement')}
          </Button>
        </div>
        <VerifyPopup
          onSubmit={() => props.handleSubmit()}
          popupVisible={popupVisibility}
          changePopupVisible={() => setPopupVisibility(!popupVisibility)}
        />
      </Form>
    </>
  );
};

const CreateAgreementForm = withFormik<ICreateAgreementOtherProps, ICreateAgreementFormValues>({
  mapPropsToValues: (props: ICreateAgreementOtherProps) => {
    return {
      offerId: props.propOfferId,
      description: '',
      userId: props.propUserId,
      plannedDate: props.purchasePlannedDate || new Date(),
      price: 0
    };
  },
  validationSchema: CreateAgreementSchema,
  handleSubmit: (values, { props }) => {
    const tripBegin = new Date(props.trip.begin);
    const tripEnd = new Date(props.trip.end);
    if (values.plannedDate.getTime() >= tripBegin.getTime() && values.plannedDate.getTime() <= tripEnd.getTime())
      props.createAgreementClick(values.description, values.plannedDate, values.price);
    else showNotification('warning', i18n.t('Bad date!'), i18n.t('Please set date between begin and end offer'));
  }
})(InnerForm);

export default CreateAgreementForm;
