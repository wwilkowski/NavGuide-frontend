import React, { ChangeEvent, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormikProps, Form, withFormik } from 'formik';
import { IRateOfferFormValues, IRateOfferFormProps } from './types';
import { showNotification } from '../../../../helpers/notification';
import TextField from '@material-ui/core/TextField';
import i18n from '../../../../locales/i18n';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const labels: { [index: string]: string } = {
  1: i18n.t('Very bad'),
  2: i18n.t('Bad'),
  3: i18n.t('Good'),
  4: i18n.t('Very good'),
  5: i18n.t('Excellent')
};

const useStyles = makeStyles(theme => ({
  form: {
    padding: window.innerWidth < 900 ? theme.spacing(2) : theme.spacing(3, 4)
  },
  span: {
    color: theme.palette.text.primary
  },
  textField: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

const RateOfferSchema = Yup.object().shape({
  scoreOffer: Yup.number().min(1, `${i18n.t('Score offer is required')}!`),
  scoreGuide: Yup.number().min(1, `${i18n.t('Score guide is required')}!`),
  comment: Yup.string()
    .min(10, `${i18n.t('Min number of characters is 10')}!`)
    .required(`${i18n.t('Description is required')}!`)
});

const InnerForm = (props: FormikProps<IRateOfferFormValues>) => {
  const { touched, errors, setFieldValue } = props;

  const classes = useStyles();

  const { t } = useTranslation();

  const [scoreGuide, setScoreGuide] = useState<number>(0);
  const [hoverScoreGuide, setHoverScoreGuide] = useState<number>(-1);
  const [scoreOffer, setScoreOffer] = useState<number>(0);
  const [hoverScoreOffer, setHoverScoreOffer] = useState<number>(-1);

  return (
    <Form className={classes.form}>
      <Grid container justify='center' xs={12} sm={12}>
        <Typography variant='h6'>{t('Please, share with us your rating')}</Typography>
        <Grid item xs={12}>
          <Typography component='span' className={classes.span}>
            {t('Guide')}
          </Typography>
        </Grid>
        <Grid container justify='flex-start' xs={12}>
          <Grid item xs={6}>
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
                  setFieldValue('scoreGuide', parseInt(event.target.value));
                }
              }}
              onChangeActive={(event: any, newHover: any) => {
                setHoverScoreGuide(newHover);
              }}
            />
          </Grid>
          {scoreGuide !== null && <Box ml={2}>{labels[hoverScoreGuide !== -1 ? hoverScoreGuide : scoreGuide]}</Box>}
        </Grid>
        <Grid container xs={12}>
          {errors.scoreGuide && touched.scoreGuide && (
            <Typography component='div' color='error'>
              {errors.scoreGuide}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography component='span' className={classes.span}>
            {t('Trip')}
          </Typography>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
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
                  setFieldValue('scoreOffer', parseInt(event.target.value));
                }
              }}
              onChangeActive={(event: any, newHover: any) => {
                setHoverScoreOffer(newHover);
              }}
            />
          </Grid>
          {scoreOffer !== null && <Box ml={2}>{labels[hoverScoreOffer !== -1 ? hoverScoreOffer : scoreOffer]}</Box>}
        </Grid>
        <Grid container xs={12}>
          {errors.scoreOffer && touched.scoreOffer && (
            <Typography component='div' color='error'>
              {errors.scoreOffer}
            </Typography>
          )}
        </Grid>
        <Grid container justify='center' xs={12}>
          <TextField
            className={classes.textField}
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
        </Grid>
        <Grid container justify='center' xs={12}>
          <Button className={classes.button} type='submit' variant='contained' color='primary' disabled={false}>
            {i18n.t('Send')}
          </Button>
        </Grid>
      </Grid>
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
      props.onSubmit({
        offerId: values.offerId,
        scoreOffer: values.scoreOffer,
        scoreGuide: values.scoreGuide,
        comment: values.comment
      });
    else showNotification('danger', 'Error', 'Try again later');
  }
})(InnerForm);

export default RateOfferForm;
