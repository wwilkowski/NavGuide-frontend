import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITag, ISuggestedPlace } from '../../containers/TripBrowser/types';
import { withFormik, FormikProps, Field, Form } from 'formik';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import * as Yup from 'yup';
import { ISearchFormValues, ISearchFormProps } from './types';
import { showNotification } from '../../helpers/notification';
import LeafletMap from '../../components/LeafletMap/LeafletMap';
import i18n from '../../locales/i18n';
import Checkbox from '../../shared/Checkbox';
import ListSuggestedTrips from './ListSuggestedTrips';
import ListTrips from './ListTrips';
import styles from './SearchForm.module.scss';
import MapIcon from '../../assets/icons/map.png';
import ListIcon from '../../assets/icons/list.png';
import CloseIcon from '../../assets/icons/close.png';

const SearchFormSchema = Yup.object().shape({});

const InnerForm = (props: ISearchFormProps & FormikProps<ISearchFormValues>) => {
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);

  const { t } = useTranslation();

  const { values, setFieldValue, touched, errors, isSubmitting } = props;

  const tags = useSelector((state: StoreType) => state.tripBrowser.tags);

  const [location, setLocation] = useState<string>('');
  const [suggestedListVisible, setSuggestedListVisible] = useState<boolean>(true);

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

  return (
    <Form autoComplete='off' className={styles.searchForm}>
      <div className={styles.searchForm__inputsCase}>
        <div className={styles.searchForm__locationInput}>
          <label htmlFor='location' className={styles.searchForm__label}>
            {t('Location')}:
          </label>
          <Field
            id='location'
            type='text'
            name='location'
            value={props.formValue}
            className={styles.searchForm__input}
            // onClick={() => {
            //   if (location !== 'UMK Wydział Matematyki i Informatyki') setSuggestedListVisible(!suggestedListVisible);
            // }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              props.handleChange(event);
              // setLocation(event.target.value);
              props.onChange(event.target.value);
            }}
          />
          {errors.location && touched.location && <div>{t(errors.location)}</div>}
          {suggestedListVisible && (
            <ListSuggestedTrips
              onCityClick={(location: ISuggestedPlace) => {
                setFieldValue('lat', location.coords[1]);
                setFieldValue('lon', location.coords[0]);
                props.setPosition({
                  latitude: location.coords[1],
                  longitude: location.coords[0],
                  radius: props.positionValue.radius
                });
                props.onSubmit(location, props.positionValue.radius, 'suggested');
              }}
              onCityHover={props.onCityHover}
              suggestedTrips={suggestedCities}
              activeTags={values.activeTags}
              changeVisible={() => setSuggestedListVisible(false)}
            />
          )}
        </div>
        <div>
          <div>
            <label htmlFor='radius' className={styles.searchForm__label}>
              {t('Radius')}:
            </label>
          </div>
          <Field
            id='radius'
            type='range'
            name='radius'
            required
            className={styles.searchForm__input}
            min={0.1}
            max={5.0}
            step='.1'
            value={props.positionValue.radius}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              props.handleChange(event);
              const position = {
                latitude: props.positionValue.latitude,
                longitude: props.positionValue.longitude,
                radius: parseFloat(event.target.value) || 0.0
              };
              props.setPosition(position);
            }}
          />
        </div>
      </div>
      <div>
        <label className={styles.searchForm__label}>{t('Interests')}:</label>
      </div>
      <ul className={styles.searchForm__tagList}>
        {tags.map((tag: ITag) => (
          <li key={tag.id}>
            <Checkbox name='activeTags' value={tag.name} valueKey={tag.name} />
          </li>
        ))}
      </ul>
      <div className={styles.searchForm__buttonCase}>
        <button type='submit' className={styles.searchForm__submitButton}>
          {t('Find')}
        </button>
        <button
          className={styles.searchForm__geoButton}
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
          {t('geolocation')}
        </button>
      </div>
    </Form>
  );
};

const ControlledSearchForm = withFormik<ISearchFormProps, ISearchFormValues>({
  mapPropsToValues: (props: ISearchFormProps) => {
    const formValue = props.formValue;
    const positionValue = props.positionValue;

    return {
      location: formValue || '',
      lat: positionValue.latitude,
      lon: positionValue.longitude,
      radius: positionValue.radius || 1,
      searchMode: 'normal',
      activeTags: []
    };
  },

  validationSchema: SearchFormSchema,

  handleSubmit: (values: ISearchFormValues, { props }) => {
    if (values.searchMode === 'geo' && (values.lat === 0 || values.lon === 0 || values.radius === 0)) {
      showNotification('warning', i18n.t('Warning'), i18n.t('Please set the cords first'));
    } else if (values.location === '' && values.searchMode === 'location') {
      showNotification('warning', i18n.t('Warning'), i18n.t('Please enter city first'));
    } else {
      props.onSubmit({ name: values.location, coords: [values.lon, values.lat] }, values.radius, 'normal');
    }
  }
})(InnerForm);

const SearchForm = (props: ISearchFormProps) => {
  const [chosenOfferId, setChosenOfferId] = useState<number | null>(null);
  const [formView, setFormView] = useState(false);

  return (
    <div className={styles.container}>
      <button
        onClick={() => setFormView(() => !formView)}
        className={styles.viewToggler}
        style={props.tripInfoVisible ? { display: 'none' } : {}}
      >
        <img src={formView ? MapIcon : ListIcon} alt='' />
      </button>
      <button
        onClick={() => props.changeTripInfoVisible(1)}
        className={styles.viewToggler}
        style={!props.tripInfoVisible ? { display: 'none' } : {}}
      >
        <img src={CloseIcon} alt='' />
      </button>
      <div className={styles.container__el}>
        <ControlledSearchForm
          onChange={props.onChange}
          onSubmit={props.onSubmit}
          updateActiveTags={props.updateActiveTags}
          formValue={props.formValue}
          positionValue={props.positionValue}
          setPosition={props.setPosition}
          trips={props.trips}
          onCityHover={props.onCityHover}
          tripInfoVisible={props.tripInfoVisible}
          changeTripInfoVisible={props.changeTripInfoVisible}
        />
        <div className={formView ? '' : styles.hidden}>
          <ListTrips
            trips={props.trips}
            mode={'normal'}
            chosenOfferId={chosenOfferId}
            setChosenOfferId={setChosenOfferId}
            changeTripInfoVisible={props.changeTripInfoVisible}
          />
        </div>
      </div>
      <div className={`${styles.container__el} ${formView ? styles.hidden : ''}`}>
        <LeafletMap position={props.positionValue} trips={props.trips} chosenOfferId={chosenOfferId} setChosenOfferId={setChosenOfferId} />
      </div>
    </div>
  );
};

export default SearchForm;
