import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITag, ISuggestedPlace } from '../../containers/TripBrowser/types';
import { withFormik, FormikProps, Form } from 'formik';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import * as Yup from 'yup';
import { ISearchFormValues, ISearchFormProps, ListMode } from './types';
import { showNotification } from '../../helpers/notification';
import LeafletMap from '../../components/LeafletMap/LeafletMap';
import i18n from '../../locales/i18n';
import Checkbox from '../../shared/Checkbox';
import ListSuggestedTrips from './ListSuggestedTrips';
import ListTrips from './ListTrips';
import styles from './SearchForm.module.scss';
import Slider from '@material-ui/core/Slider';
import DatePicker from 'react-datepicker';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

const SearchFormSchema = Yup.object().shape({});

const InnerForm = (props: ISearchFormProps & FormikProps<ISearchFormValues>) => {
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);

  const { t } = useTranslation();

  const { values, setFieldValue, touched, errors, isSubmitting } = props;

  const tags = useSelector((state: StoreType) => state.tripBrowser.tags);

  const [location, setLocation] = useState<string>('');
  const [fixedRadiusView, setFixedRadiusView] = useState<Boolean>(false);
  const [suggestedListVisible, setSuggestedListVisible] = useState<boolean>(true);

  const checkScroll = (e: Event) => {
    if (window.scrollY > 0) {
      setFixedRadiusView(true);
    } else {
      setFixedRadiusView(false);
    }
  };

  useEffect(() => {
    setFieldValue('searchMode', 'geo');

    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [setFieldValue]);

  useEffect(() => {
    setSuggestedListVisible(true);
  }, [location]);

  useEffect(() => {
    if (Object.keys(errors).length !== 0 && isSubmitting) {
      Object.values(errors).forEach(error => {
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

  return (
    <Form autoComplete='off'>
      <div className={styles.searchForm__formContainer}>
        <div className={styles.searchForm__inputsCase}>
          <div className={styles.location}>
            <TextField
              id={'location'}
              type='text'
              name='location'
              label={t('Location')}
              value={props.formValue}
              className={styles.input}
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
                    radius: props.positionValue.radius
                  });
                  props.onSubmit(location, props.positionValue.radius, 'suggested', values.end, values.begin);
                }}
                onCityHover={props.onCityHover}
                suggestedTrips={suggestedCities}
                activeTags={values.activeTags}
                changeVisible={() => setSuggestedListVisible(false)}
              />
            )}
          </div>
          <div className={fixedRadiusView ? styles.fixedRadius : ''}>
            <div>
              <label htmlFor='radius' className={styles.label}>
                {t('Radius')} (KM):
              </label>
            </div>
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
                  radius: Number(value) || 0.0
                };
                props.setPosition(position);
              }}
            />
          </div>
        </div>

        {isLogged && (
          <div className={styles.searchForm__inputsCase}>
            <div className={styles.searchMode}>
              <label htmlFor='searchMode' className={styles.label}>
                {t('Search mode')}:
              </label>
              <div className={styles.searchForm__radios}>
                <label htmlFor='searchMode' className={styles.radioLabel}>
                  {t('address')}
                </label>
                <Radio
                  checked={values.searchMode === 'geo'}
                  onChange={() => setFieldValue('searchMode', 'geo')}
                  value='geo'
                  color='primary'
                  size='small'
                />
                <label htmlFor='searchMode' className={styles.radioLabel}>
                  {t('name')}
                </label>

                <Radio
                  checked={values.searchMode === 'name'}
                  onChange={() => setFieldValue('searchMode', 'name')}
                  value='name'
                  color='primary'
                  size='small'
                />
              </div>
            </div>
            <div className={styles.searchForm__dateInput}>
              <label htmlFor='date' className={styles.label}>
                {t('Date')}:
              </label>
              <div className={styles.searchMode}>
                <label htmlFor='begin' className={styles.label}>
                  {t('From')}:
                </label>
                <DatePicker
                  dateFormat='yyyy/MM/dd'
                  selected={values.begin}
                  onChange={date => setFieldValue('begin', date)}
                  className={styles.datePicker}
                />
                {errors.begin && touched.begin && <div>{t(`Incorrect date`)}</div>}
              </div>
              <div className={styles.searchMode}>
                <label htmlFor='end' className={styles.label}>
                  {t('To')}:
                </label>
                <DatePicker
                  dateFormat='yyyy/MM/dd'
                  selected={values.end}
                  onChange={date => setFieldValue('end', date)}
                  className={styles.datePicker}
                />
                {errors.end && touched.end && <div>{t(`Incorrect date`)}</div>}
              </div>
            </div>
          </div>
        )}

        <div>
          <label className={styles.label}>{t('Tags')}:</label>
        </div>
        <ul className={styles.tagList}>
          {tags.map((tag: ITag) => (
            <li key={tag.id} className={styles.tag}>
              <Checkbox name='activeTags' value={tag.name} valueKey={tag.name} />
            </li>
          ))}
        </ul>
        <div className={styles.buttonCase}>
          <Button variant='contained' color='primary' type='submit' className={styles.button}>
            {t('Find')}
          </Button>
          <Button
            className={styles.button}
            onClick={() => {
              var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
              };
              navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }: Position) => {
                  setFieldValue('lat', latitude);
                  setFieldValue('lon', longitude);
                  showNotification('success', t('Geolocation changed'), t('You changed coords based on your location'));
                  props.setPosition({
                    ...props.positionValue,
                    latitude,
                    longitude
                  });
                },
                error => {
                  if (error.code === 1) {
                    showNotification(
                      'warning',
                      t('You denied access to your geolocation'),
                      t('Allow access following instructions [instruction will be here]')
                    );
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
        </div>
      </div>
    </Form>
  );
};

const ControlledSearchForm = withFormik<ISearchFormProps, ISearchFormValues>({
  mapPropsToValues: (props: ISearchFormProps) => {
    const formValue = props.formValue;
    const positionValue = props.positionValue;

    const defaultBegin = new Date();
    defaultBegin.setDate(defaultBegin.getDate() - 30);
    const defaultEnd = new Date();
    defaultEnd.setDate(defaultEnd.getDate() + 30);

    return {
      location: formValue || '',
      lat: positionValue.latitude,
      lon: positionValue.longitude,
      radius: positionValue.radius || 1,
      searchMode: '',
      activeTags: [],
      begin: defaultBegin,
      end: defaultEnd
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
            suburb: ''
          }
        },
        values.radius,
        values.searchMode,
        values.end,
        values.begin
      );
    }
  }
})(InnerForm);

const SearchForm = (props: ISearchFormProps) => {
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);

  const [chosenOfferId, setChosenOfferId] = useState<number | null>(null);
  const [formView, setFormView] = useState(true);

  const { setPosition, positionValue, formValue, trips, getTrips } = props;

  const [mode, setMode] = useState<ListMode>(ListMode.normal);

  useEffect(() => {
    if (!trips.length && isLogged) setMode(ListMode.closest);
    else if (!trips.length && !isLogged) setMode(ListMode.popular);
    else setMode(ListMode.normal);
  }, [isLogged, trips]);

  useEffect(() => {
    if (mode !== ListMode.normal) getTrips(mode);
  }, [getTrips, mode]);

  return (
    <div className={styles.container}>
      <div className={styles.searchForm}>
        <div className={styles.options}>
          <p>View map</p>
          <Switch checked={!formView} onChange={() => setFormView(!formView)} value='formView' color='primary' />
        </div>
        <div style={!formView ? { display: 'none' } : {}}>
          <ControlledSearchForm
            onChange={props.onChange}
            onSubmit={props.onSubmit}
            getTrips={props.getTrips}
            updateActiveTags={props.updateActiveTags}
            formValue={formValue}
            positionValue={positionValue}
            setPosition={setPosition}
            trips={props.trips}
            onCityHover={props.onCityHover}
            onCityClick={props.onCityClick}
          />
          <div className={formView ? '' : styles.hidden}>
            <ListTrips trips={props.trips} mode={mode} chosenOfferId={chosenOfferId} setChosenOfferId={setChosenOfferId} />
          </div>
        </div>
      </div>
      <div style={formView && window.innerWidth < 900 ? { visibility: 'hidden' } : {}}>
        <LeafletMap
          position={positionValue}
          height='100vh'
          trips={props.trips}
          chosenOfferId={chosenOfferId}
          setChosenOfferId={setChosenOfferId}
        />
      </div>
    </div>
  );
};

export default SearchForm;
