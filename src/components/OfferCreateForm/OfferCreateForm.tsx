import React, { useEffect, useState } from 'react';
import * as types from './types';
import { withFormik, FormikProps, Field, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { fetchTagsRequested } from '../../containers/TripBrowser/actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../store';
import { ITag } from '../../containers/TripBrowser/types';
import Checkbox from '../../shared/Checkbox';
import ListSuggestedTrips from '../TripBrowser/ListSuggestedTrips';
import { ISuggestedPlace } from '../../containers/TripBrowser/types';

const InnerForm = (props: types.MyFormProps & FormikProps<types.FullFormValues>) => {
  const { touched, errors, setFieldValue, values } = props;
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const tags = useSelector((state: StoreType) => state.tripBrowser.tags);
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);

  useEffect(() => {
    dispatcher(fetchTagsRequested());
  }, [dispatcher]);

  const [location, setLocation] = useState<string>('');
  const [suggestedListVisible, setSuggestedListVisible] = useState<boolean>(false);
  const [photos, setPhotos] = useState<File | undefined>(undefined);

  const handlePhotoChange = (selectorFiles: FileList | null) => {
    if (selectorFiles != null) {
      setPhotos(selectorFiles[0]);
      values.file.push(selectorFiles[0]);
    }
  };

  return (
    <div>
      <Form>
        <label className='label' htmlFor='location'>
          {t('Find place')}
        </label>
        <Field
          id='location'
          type='text'
          name='location'
          value={location}
          className={`input`}
          style={{ width: '300px' }}
          onClick={() => {
            setSuggestedListVisible(true);
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.handleChange(event);
            setLocation(event.target.value);
            props.onChange(event.target.value);
          }}
        />
        {errors.place && touched.place && <div>{t(errors.place)}</div>}
        {suggestedListVisible && (
          <div>
            <ListSuggestedTrips
              onCityClick={(location: ISuggestedPlace) => {
                setFieldValue('lat', location.coords[1]);
                setFieldValue('lon', location.coords[0]);
                props.setPosition({
                  latitude: location.coords[1],
                  longitude: location.coords[0],
                  radius: props.position.radius
                });
                setSuggestedListVisible(false);
              }}
              onCityHover={(location: ISuggestedPlace) => {}}
              suggestedTrips={suggestedCities}
              activeTags={[]}
            />
          </div>
        )}
        <div className='field'>
          <label className='label' htmlFor='name'>
            {t('Offer name')}
          </label>
          <Field className='input' id='name' type='text' name='name' />
          {errors.name && touched.name && <div>{t(errors.name)}</div>}
        </div>
        <input type='file' onChange={e => handlePhotoChange(e.target.files)} />
        <div className='field'>
          <label className='label' htmlFor='begin'>
            {t('Begin')}
          </label>
          <Field className='input' id='begin' type='date' name='begin' />
          {errors.begin && touched.begin && <div>{t(`Incorrect date`)}</div>}
        </div>
        <div className='field'>
          <label className='label' htmlFor='end'>
            {t('End')}
          </label>
          <Field className='input' id='end' type='date' name='end' />
          {errors.end && touched.end && <div>{t(`Incorrect date`)}</div>}
        </div>
        <div className='field'>
          <label className='label' htmlFor='city'>
            {t('City')}
          </label>
          <Field className='input' id='city' type='text' name='city' />
          {errors.city && touched.city && <div>{t(errors.city)}</div>}
        </div>
        <div className='field'>
          <label className='label' htmlFor='maxPeople'>
            {t('Max people')}
          </label>
          <Field className='input' id='maxPeople' type='number' name='maxPeople' />
          {errors.maxPeople && touched.maxPeople && <div>{t(`Incorrect number`)}</div>}
        </div>
        <div className='field'>
          <label className='label' htmlFor='price'>
            {t('Price')}
          </label>
          <Field className='input' id='price' type='number' name='price' />
          {errors.price && touched.price && <div>{t(`Incorrect number`)}</div>}
        </div>
        <div className='field'>
          <label className='label' htmlFor='priceType'>
            {t('Price type')}
          </label>
          <div className='select'>
            <Field as='select' id='priceType' name='priceType'>
              <option value='PER_PERSON'>{t('per person')}</option>
              <option value='PER_Person'>{t('per group')}</option>
            </Field>
          </div>
        </div>
        <div className='field'>
          <label className='label' htmlFor='radius'>
            {t('Radius')}
          </label>
          <Field
            className='input'
            id='radius'
            type='number'
            name='radius'
            required
            min={0.1}
            step='.1'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length) {
                props.handleChange(event);
                const position = {
                  latitude: props.position.latitude,
                  longitude: props.position.longitude,
                  radius: parseFloat(event.target.value)
                };
                props.setPosition(position);
              } else {
                props.handleChange(event);
                const position = {
                  latitude: props.position.latitude,
                  longitude: props.position.longitude,
                  radius: 0
                };
                props.setPosition(position);
              }
            }}
          />
          {errors.radius && touched.radius && <div>{t(`Incorrect number`)}</div>}
        </div>
        <ul>
          {tags.map((tag: ITag) => (
            <li key={tag.id}>
              <Checkbox name='tags' value={tag.name} valueKey={tag.name} />
            </li>
          ))}
        </ul>
        <button className='button is-primary' type='submit'>
          {t('Submit')}
        </button>
      </Form>
    </div>
  );
};

const OfferCreateForm = withFormik<types.MyFormProps, types.FullFormValues>({
  mapPropsToValues: (props: types.MyFormProps) => {
    const { longitude, latitude, radius } = props.position;
    return {
      place: props.place || '',
      begin: new Date(),
      city: 'Torun',
      end: new Date(),
      file: [],
      lat: latitude || 0.0,
      lon: longitude || 0.0,
      maxPeople: 0,
      name: 'Trip name',
      price: 0.0,
      priceType: 'PER_PERSON',
      radius: radius || 0.0,
      tags: []
    };
  },

  handleSubmit: (values: types.FullFormValues, { props }) => {
    props.onSubmit(values);
  }
})(InnerForm);

export default OfferCreateForm;
