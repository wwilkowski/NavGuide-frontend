import React, { useEffect, useState } from 'react';
import { ICreateAgreementOtherProps, ICreateAgreementFormValues } from './types';
import { FormikProps, Form, withFormik } from 'formik';
import { TextField, Button, Grid, Typography, makeStyles } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import i18n from '../../locales/i18n';
import { showNotification } from '../../helpers/notification';
import TripListElement from '../TripBrowser/TripListElement';
import VerifyPopup from '../../shared/VerifyPopup';

const CreateAgreementSchema = Yup.object().shape({
  description: Yup.string().min(10, i18n.t('Min. number of characters is 10')).required(i18n.t('Description is required!')),
  price: Yup.number().min(1, i18n.t('Min. price is 1')).required(i18n.t('Price is required')),
});

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(3),
  },
  item: {
    paddingBottom: theme.spacing(2),
    width: '100%',
    textAlign: 'center',
    // eslint-disable-line no-useless-computed-key
    '@media (min-width:780px)': {
      width: '300px',
    },
    '& input': {
      textAlign: 'center',
    },
  },
  date: {
    margin: '1rem',
  },
}));

const InnerForm = (props: ICreateAgreementOtherProps & FormikProps<ICreateAgreementFormValues>) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { touched, errors, values } = props;

  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);

  useEffect(() => {
    //const tmp = sessionStorage.getItem('agreementData');
    const tmp = sessionStorage.getItem('agreementData');
    if (tmp) {
      const data = JSON.parse(tmp);
      props.setFieldValue('price', data.price);
      // props.setFieldValue('plannedDate', new Date(data.plannedDate));
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
            description: values.description,
          };
          sessionStorage.setItem('agreementData', JSON.stringify(data));
        }}
      >
        <TripListElement trip={props.trip} />
      </div>
      <Form className={classes.form}>
        <Grid container xs={12} sm={12} justify={'center'}>
          <Grid container xs={12} sm={12} justify={'center'}>
            <Typography variant='subtitle1'>{t('Price')}</Typography>
          </Grid>
          <Grid container xs={12} sm={12} justify={'center'}>
            <TextField
              className={classes.item}
              id='price'
              type='text'
              name='price'
              value={values.price}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleChange(event)}
            />
            {errors.price && touched.price && <div>{t(errors.price)}</div>}
          </Grid>
          <Grid container justify={'center'}>
            <Typography variant='subtitle1'>{t('Select date')}</Typography>
          </Grid>
          <Grid container className={classes.item} justify={'center'}>
            <DatePicker
              dateFormat='yyyy/MM/dd HH:mm'
              timeFormat='HH:mm'
              timeIntervals={30}
              showTimeSelect
              locale='pl-PL'
              minDate={new Date(props.trip.begin)}
              maxDate={new Date(props.trip.end)}
              selected={values.plannedDate}
              onChange={(date) => props.setFieldValue('plannedDate', date)}
              className={classes.date}
            />
          </Grid>
          <Grid container xs={12} justify='center'>
            <TextField
              id='description'
              label={t('Message to tourist')}
              multiline
              rows='4'
              value={values.description}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.handleChange(event)}
              variant='outlined'
            />
          </Grid>
          <Grid container xs={12} sm={12} justify='center' className={classes.item}>
            {errors.description && touched.description && (
              <Typography variant='body1' color='error'>
                {t(errors.description)}
              </Typography>
            )}
          </Grid>

          <Grid container justify='center'>
            <Button style={{ marginBottom: '3rem' }} variant='contained' color='primary' onClick={() => setPopupVisibility(true)}>
              {t('Create Agreement')}
            </Button>
          </Grid>
          <VerifyPopup
            onSubmit={() => props.handleSubmit()}
            popupVisible={popupVisibility}
            changePopupVisible={() => setPopupVisibility(!popupVisibility)}
          />
        </Grid>
      </Form>
    </>
  );
};

const CreateAgreementForm = withFormik<ICreateAgreementOtherProps, ICreateAgreementFormValues>({
  mapPropsToValues: (props: ICreateAgreementOtherProps) => {
    const newDate = new Date(props.purchasePlannedDate);
    newDate.setHours(newDate.getHours() - 2);
    return {
      offerId: props.propOfferId,
      description: '',
      userId: props.propUserId,
      plannedDate: newDate,
      price: props.trip.price,
    };
  },
  validationSchema: CreateAgreementSchema,
  handleSubmit: (values, { props }) => {
    const tripBegin = new Date(props.trip.begin);
    const tripEnd = new Date(props.trip.end);
    if (new Date(values.plannedDate).getTime() >= tripBegin.getTime() && new Date(values.plannedDate).getTime() <= tripEnd.getTime())
      props.createAgreementClick(values.description, values.plannedDate, values.price);
    else showNotification('warning', i18n.t('Bad date!'), i18n.t('Please set date between begin and end offer'));
  },
})(InnerForm);

export default CreateAgreementForm;
