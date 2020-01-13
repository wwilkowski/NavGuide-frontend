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
import Checkbox from '@material-ui/core/Checkbox';
import styles from './SearchForm.module.scss';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListSuggestedTrips from './ListSuggestedTrips';
import ListTrips from './ListTrips';

const SearchFormSchema = Yup.object().shape({});

const InnerForm = (props: ISearchFormProps & FormikProps<ISearchFormValues>) => {
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);

  const { t } = useTranslation();

  const tags = useSelector((state: StoreType) => state.tripBrowser.tags);

  const { values, setFieldValue, touched, errors, isSubmitting } = props;

  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    if (Object.keys(errors).length !== 0 && isSubmitting) {
      Object.values(errors).forEach(error => {
        showNotification('warning', t('Form warning'), t(`${error}`));
      });
    }
  }, [errors, isSubmitting, t]);

  useEffect(() => {
    setLocation(props.formValue);
    values.location = props.formValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.formValue]);

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tagNames = tags.map((tag: ITag) => tag.name);
    const tmp = values.activeTags;
    tagNames.forEach((tagName: string) => {
      if (event.target.value === tagName) {
        if (!values.activeTags.includes(tagName)) tmp.push(tagName);
        else {
          const index = values.activeTags.indexOf(tagName);
          tmp.splice(index, 1);
        }
      }
    });
    props.updateActiveTags(tmp);
    setFieldValue('activeTags', tmp);
  };

  return (
    <div>
      <Form className={styles.searchForm} autoComplete='off'>
        <div>
          <div>
            <label htmlFor='location'>{t('Location')}:</label>
          </div>

          <div className={styles.locationInput}>
            <Field
              id='location'
              type='text'
              name='location'
              value={location}
              className={'input'}
              style={{ width: '300px' }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.handleChange(event);
                setLocation(event.target.value);
                props.onChange(event.target.value);
              }}
            />
            {errors.location && touched.location && <div>{t(errors.location)}</div>}
            <ListSuggestedTrips
              onCityClick={(location: ISuggestedPlace) => {
                setFieldValue('lat', location.coords[1]);
                setFieldValue('lon', location.coords[0]);
                props.setPosition({
                  latitude: location.coords[1],
                  longitude: location.coords[0],
                  radius: props.positionValue.radius
                });
                props.onSubmit(location, props.positionValue.radius);
              }}
              onCityHover={props.onCityHover}
              suggestedTrips={suggestedCities}
              activeTags={values.activeTags}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor='radius'>{t('Radius')}:</label>
          </div>
          <Field
            className='input'
            id='radius'
            type='number'
            name='radius'
            required
            style={{ width: '200px' }}
            min={0.1}
            step='.1'
            value={props.positionValue.radius}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length) {
                props.handleChange(event);
                const position = {
                  latitude: props.positionValue.latitude,
                  longitude: props.positionValue.longitude,
                  radius: parseFloat(event.target.value)
                };
                props.setPosition(position);
              } else {
                props.handleChange(event);
                const position = {
                  latitude: props.positionValue.latitude,
                  longitude: props.positionValue.longitude,
                  radius: 0
                };
                props.setPosition(position);
              }
            }}
          />
        </div>
        <ul className={styles.tagList}>
          {tags.map((tag: ITag) => (
            <li key={tag.id}>
              <FormControlLabel
                control={
                  <Checkbox name='activeTags' value={tag.name} checked={values.activeTags.includes(tag.name)} onChange={handleTagChange} />
                }
                label={tag.name}
              />
            </li>
          ))}
        </ul>
        <button className='button is-primary' type='submit'>
          {t('Find')}
        </button>
        <label htmlFor='currentGeo'>
          <input
            type='button'
            className='button is-info'
            value='geolocation'
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
                  showNotification('success', 'Geolocation changed', 'You changed coords based on your location');
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
          />
        </label>
      </Form>
    </div>
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
      props.onSubmit({ name: values.location, coords: [values.lon, values.lat] }, values.radius);
    }
  }
})(InnerForm);

const SearchForm = (props: ISearchFormProps) => (
  <div className='column'>
    <ControlledSearchForm
      onChange={props.onChange}
      onSubmit={props.onSubmit}
      updateActiveTags={props.updateActiveTags}
      formValue={props.formValue}
      positionValue={props.positionValue}
      setPosition={props.setPosition}
      trips={props.trips}
      onCityHover={props.onCityHover}
    />
    <div className={styles.mapContainer}>
      <LeafletMap position={props.positionValue} trips={props.trips} />
      <div className={styles.tripList}>
        <ListTrips trips={props.trips} mode={'normal'} />
      </div>
    </div>
  </div>
);

export default SearchForm;
