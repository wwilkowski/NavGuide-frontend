import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { Form, FormikProps, withFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ISuggestedPlace } from '../containers/TripBrowser/types';
import { showNotification } from '../helpers/notification';
import i18n from '../locales/i18n';
import { StoreType } from '../store';
import TagList from './TagList';
import ListSuggestedTrips from './TripBrowser/ListSuggestedTrips';
import { ISearchFormProps, ISearchFormValues } from './TripBrowser/types';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Container,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Box,
  Grid,
} from '@material-ui/core';

const SearchFormSchema = Yup.object().shape({});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        width: '100%',
        margin: '0',
      },
    },
    locationInput: {
      position: 'relative',
      '& .MuiFormControl-root': {
        width: '100%',
      },
    },
    suggestedList: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    datePicker: {
      padding: '0.1rem 0.2rem',
    },
  })
);

const InnerForm = (props: ISearchFormProps & FormikProps<ISearchFormValues>) => {
  const { values, setFieldValue, touched, errors, isSubmitting } = props;

  const { t } = useTranslation();

  const classes = useStyles();

  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);
  const tags = useSelector((state: StoreType) => state.tripBrowser.tags);

  const [location, setLocation] = useState<string>('');
  const [suggestedListVisible, setSuggestedListVisible] = useState<boolean>(true);

  useEffect(() => {
    setSuggestedListVisible(true);
  }, [location]);

  useEffect(() => {
    suggestedCities.splice(0, suggestedCities.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (values.searchMode === 'geo') setSuggestedListVisible(false);
  }, [values.searchMode]);

  useEffect(() => {
    if (Object.keys(errors).length !== 0 && isSubmitting) {
      Object.values(errors).forEach((error) => {
        showNotification('warning', t('Form warning'), t(`${error}`));
      });
    }
  }, [errors, isSubmitting, t]);

  useEffect(() => {
    props.updateActiveTags(values.activeTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.activeTags]);

  useEffect(() => {
    setLocation(props.formValue);
    values.location = props.formValue;
  }, [props.formValue, values.location]);

  function valuetext(value: number) {
    return `${value}km`;
  }

  const radiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('searchMode', event.target.value);
  };

  return (
    <Container>
      <Form autoComplete='off' className={classes.root}>
        <Grid container alignItems='flex-start' spacing={2}>
          <Grid item xs={12}>
            <div className={classes.locationInput}>
              <TextField
                id={'location'}
                type='text'
                name='location'
                label={values.searchMode === 'geo' ? t('Location') : t('Offer name')}
                value={props.formValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.handleChange(event);
                  props.onChange(event.target.value);
                }}
              />
              {errors.location && touched.location && <div>{t(errors.location)}</div>}
              {values.searchMode === 'geo' && suggestedListVisible && suggestedCities.length > 0 && (
                <ListSuggestedTrips
                  onCityClick={(location: ISuggestedPlace) => {
                    props.onCityClick();
                    setFieldValue('lat', location.coords[1]);
                    setFieldValue('lon', location.coords[0]);
                    props.setPosition({
                      latitude: location.coords[1],
                      longitude: location.coords[0],
                      radius: props.positionValue.radius,
                    });
                    props.onSubmit(location, props.positionValue.radius, 'suggested', values.end, values.begin);
                  }}
                  onCityHover={props.onCityHover}
                  suggestedTrips={suggestedCities}
                  activeTags={values.activeTags}
                  changeVisible={() => setSuggestedListVisible(true)}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography component='label' variant='subtitle2'>
              {t('Radius')}
            </Typography>
            <Slider
              defaultValue={0.0}
              getAriaValueText={valuetext}
              aria-labelledby='discrete-slider-small-steps'
              value={props.positionValue.radius}
              step={0.1}
              marks
              min={0.0}
              max={5.0}
              valueLabelDisplay='auto'
              onChange={(event: React.ChangeEvent<{}>, value: number | number[]) => {
                setFieldValue('radius', value);
                props.handleChange(event);
                const position = {
                  latitude: props.positionValue.latitude,
                  longitude: props.positionValue.longitude,
                  radius: Number(value) || 0.0,
                };
                props.setPosition(position);
              }}
            />
          </Grid>
        </Grid>
        {isLogged && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <FormControl component='fieldset'>
                <Typography component='legend' variant='subtitle2'>
                  {t('Search mode')}
                </Typography>
                <RadioGroup aria-label='searchMode' name='searchMode' value={values.searchMode} onChange={radiusChange} row>
                  <FormControlLabel value='geo' control={<Radio color='primary' />} label='Place name' />
                  <FormControlLabel value='name' control={<Radio color='primary' />} label='Offer name' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography component='label' variant='subtitle2' htmlFor='begin'>
                  {t('From')}:
                </Typography>
                <DatePicker
                  dateFormat='yyyy/MM/dd'
                  minDate={new Date()}
                  selected={values.begin}
                  onChange={(date) => setFieldValue('begin', date)}
                  className={classes.datePicker}
                />
              </Box>
              {errors.begin && touched.begin && <div>{t(`Incorrect date`)}</div>}
              <Box>
                <Typography component='label' variant='subtitle2' htmlFor='end'>
                  {t('To')}:
                </Typography>
                <DatePicker
                  dateFormat='yyyy/MM/dd'
                  minDate={values.begin}
                  selected={values.end}
                  onChange={(date) => setFieldValue('end', date)}
                  className={classes.datePicker}
                />
              </Box>
              {errors.end && touched.end && <div>{t(`Incorrect date`)}</div>}
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2}>
          <Grid item>
            <label>{t('Tags')}:</label>
            <TagList tags={tags} />
          </Grid>
        </Grid>
        <Grid container alignItems='flex-start' spacing={2}>
          <Grid item>
            <Button variant='contained' color='primary' type='submit'>
              {t('Find')}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                var options = {
                  enableHighAccuracy: true,
                  timeout: 5000,
                  maximumAge: 0,
                };
                navigator.geolocation.getCurrentPosition(
                  ({ coords: { latitude, longitude } }: Position) => {
                    setFieldValue('lat', latitude);
                    setFieldValue('lon', longitude);
                    showNotification('success', t('Geolocation changed'), t('You changed coords based on your location'));
                    props.setPosition({
                      ...props.positionValue,
                      latitude,
                      longitude,
                    });
                  },
                  (error) => {
                    if (error.code === 1) {
                      showNotification('warning', t('You denied access to your geolocation'), t('You have not changed coords'));
                    } else {
                      showNotification('danger', t('Something goes wrong'), t(`${error.message}`));
                    }
                  },
                  options
                );
              }}
            >
              {t('Geolocation')}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};

const ControlledSearchForm = withFormik<ISearchFormProps, ISearchFormValues>({
  mapPropsToValues: (props: ISearchFormProps) => {
    const formValue = props.formValue;
    const positionValue = props.positionValue;

    const defaultBegin = new Date();
    defaultBegin.setDate(defaultBegin.getDate());
    const defaultEnd = new Date();
    defaultEnd.setDate(defaultEnd.getDate() + 30);

    return {
      location: formValue || '',
      lat: positionValue.latitude,
      lon: positionValue.longitude,
      radius: positionValue.radius || 1,
      searchMode: 'geo',
      activeTags: [],
      begin: defaultBegin,
      end: defaultEnd,
    };
  },

  validationSchema: SearchFormSchema,

  handleSubmit: (values: ISearchFormValues, { props }) => {
    if (values.searchMode === 'geo' && (values.lat === 0 || values.lon === 0 || values.radius === 0)) {
      showNotification('warning', i18n.t('Warning'), i18n.t('Please set the cords first'));
    } else if (values.location === '' && values.searchMode === 'location') {
      showNotification('warning', i18n.t('Warning'), i18n.t('Please enter city first'));
    } else {
      props.onSubmit(
        {
          displayName: values.location,
          coords: [values.lon, values.lat],
          class: '',
          type: '',
          address: {
            type: '',
            cityDistrict: '',
            country: '',
            countryCode: '',
            footway: '',
            neighbourhood: '',
            postcode: '',
            state: '',
            suburb: '',
          },
        },
        values.radius,
        values.searchMode,
        values.end,
        values.begin
      );
    }
  },
})(InnerForm);

export default ControlledSearchForm;
