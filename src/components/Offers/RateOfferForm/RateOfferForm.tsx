import React, { ChangeEvent, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormikProps, Form, withFormik } from 'formik';
import { IRateOfferFormValues, IRateOfferFormProps } from './types';
import { showNotification } from '../../../helpers/notification';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import i18n from '../../../locales/i18n';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import styles from './RateOfferForm.module.scss';

const labels: { [index: string]: string } = {
  1: i18n.t('Very bad'),
  2: i18n.t('Bad'),
  3: i18n.t('Good'),
  4: i18n.t('Very good'),
  5: i18n.t('Excellent')
};

const RateOfferSchema = Yup.object().shape({
  scoreOffer: Yup.number().min(1, i18n.t('Score offer is required') + '!'),
  scoreGuide: Yup.number().min(1, i18n.t('Score guide is required') + '!'),
  comment: Yup.string()
    .min(10, i18n.t('Min number of characters is 10') + '!')
    .required(i18n.t('Description is required' + '!'))
});

const InnerForm = (props: FormikProps<IRateOfferFormValues>) => {
  const { touched, errors, setFieldValue } = props;

  const { t } = useTranslation();

  const [scoreGuide, setScoreGuide] = useState<number>(0);
  const [hoverScoreGuide, setHoverScoreGuide] = useState<number>(-1);
  const [scoreOffer, setScoreOffer] = useState<number>(0);
  const [hoverScoreOffer, setHoverScoreOffer] = useState<number>(-1);
  const [disabled, setDisabled] = useState<boolean>(false);

  /*useEffect(() => {
    if (hoverScoreGuide === -1) setFieldValue('scoreGuide', 0);
    if (hoverScoreOffer === -1) setFieldValue('scoreOffer', 0);
  }, [hoverScoreGuide, hoverScoreOffer]);*/

  /*useEffect(() => {
    if (errors.comment || errors.scoreOffer || errors.scoreGuide) setDisabled(true);
    else setDisabled(false);
  }, [errors]);*/

  return (
    <Form className={styles.form}>
      <p className={styles.form__title}>{t('Please, share with us your rating')}</p>
      <label className={styles.form__label} htmlFor='scoreGuide'>
        {t('Guide')}
      </label>
      <div className={styles.form__caseRate}>
        <Rating
          name='scoreGuide'
          value={scoreGuide}
          precision={1}
          onChange={(event: any, newValue: any) => {
            if (newValue === null) {
              setScoreGuide(0);
              setFieldValue('scoreGuide', 0);
            } else {
              setScoreGuide(newValue);
              setFieldValue('scoreGuide', event.target.value);
            }
          }}
          onChangeActive={(event: any, newHover: any) => {
            setHoverScoreGuide(newHover);
          }}
        />
        {scoreGuide !== null && <Box ml={2}>{labels[hoverScoreGuide !== -1 ? hoverScoreGuide : scoreGuide]}</Box>}
      </div>
      {errors.scoreGuide && touched.scoreGuide && <div>{errors.scoreGuide}</div>}
      <label className={styles.form__label} htmlFor='scoreOffer'>
        {t('Trip')}:
      </label>
      <div className={styles.form__caseRate}>
        <Rating
          name='scoreOffer'
          value={scoreOffer}
          precision={1}
          onChange={(event: any, newValue: any) => {
            if (newValue === null) {
              setScoreOffer(0);
              setFieldValue('scoreOffer', 0);
            } else {
              setScoreOffer(newValue);
              setFieldValue('scoreOffer', event.target.value);
            }
          }}
          onChangeActive={(event: any, newHover: any) => {
            setHoverScoreOffer(newHover);
          }}
        />
        {scoreOffer !== null && <Box ml={2}>{labels[hoverScoreOffer !== -1 ? hoverScoreOffer : scoreOffer]}</Box>}
      </div>
      {errors.scoreOffer && touched.scoreOffer && <div>{errors.scoreOffer}</div>}
      <TextField
        helperText={t(errors.comment || '')}
        style={{ margin: '1rem 0 0' }}
        id='outlined-textarea'
        label={i18n.t('Description')}
        multiline
        rows={4}
        variant='outlined'
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFieldValue('comment', e.target.value);
        }}
      />
      <div className={styles.form__button}>
        <Button type='submit' variant='contained' color='primary' disabled={false}>
          {i18n.t('Send')}
        </Button>
      </div>
    </Form>
  );
};

const RateOfferForm = withFormik<IRateOfferFormProps, IRateOfferFormValues>({
  mapPropsToValues: props => {
    return {
      offerId: props.offerId || -1,
      scoreOffer: 0,
      scoreGuide: 0,
      comment: ''
    };
  },
  validationSchema: RateOfferSchema,
  handleSubmit: (values, { props }) => {
    if (values.offerId !== -1)
      props.onSubmit({ offerId: values.offerId, scoreOffer: values.scoreOffer, scoreGuide: values.scoreGuide, comment: values.comment });
    else showNotification('danger', 'Error', 'Try again later');
  }
})(InnerForm);

export default RateOfferForm;
