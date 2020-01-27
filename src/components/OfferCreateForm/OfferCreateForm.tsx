import React, { useEffect } from 'react';
import * as types from './types';
import { withFormik, FormikProps, Field, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { fetchTagsRequested } from '../../containers/TripBrowser/actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../store';
import { ITag } from '../../containers/TripBrowser/types';
import Checkbox from '../../shared/Checkbox';

const InnerForm = (props: FormikProps<types.FullFormValues>) => {
  const { touched, errors } = props;
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const tags = useSelector((state: StoreType) => state.tripBrowser.tags);

  useEffect(() => {
    dispatcher(fetchTagsRequested());
  }, [dispatcher]);

  return (
    <div>
      <Form>
        <div className='field'>
          <label className='label' htmlFor='name'>
            {t('Offer name')}
          </label>
          <Field className='input' id='name' type='text' name='name' />
          {errors.name && touched.name && <div>{t(errors.name)}</div>}
        </div>
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
          <label className='label' htmlFor='lat'>
            {t('Lat')}
          </label>
          <Field className='input' id='lat' type='number' name='lat' />
          {errors.lat && touched.lat && <div>{t(`Incorrect number`)}</div>}
        </div>
        <div className='field'>
          <label className='label' htmlFor='lon'>
            {t('Lon')}
          </label>
          <Field className='input' id='lon' type='number' name='lon' />
          {errors.lon && touched.lon && <div>{t(`Incorrect number`)}</div>}
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
          <Field className='input' id='radius' type='number' name='radius' />
          {errors.radius && touched.radius && <div>{t(`Incorrect number`)}</div>}
        </div>
        <ul>
          {tags.map((tag: ITag) => (
            <li key={tag.id}>
              <Checkbox name='activeTags' value={tag.name} valueKey={tag.name} />
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
    return {
      begin: new Date(),
      city: 'Torun',
      end: new Date(),
      file: [],
      lat: 0.0,
      lon: 0.0,
      maxPeople: 0,
      name: 'Trip name',
      price: 0.0,
      priceType: 'PER_PERSON',
      radius: 0.0,
      tags: []
    };
  },

  handleSubmit: (values: types.FullFormValues, { props }) => {
    alert(JSON.stringify(values));
  }
})(InnerForm);

export default OfferCreateForm;
