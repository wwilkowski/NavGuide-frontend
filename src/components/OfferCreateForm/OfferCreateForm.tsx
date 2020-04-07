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
import styles from './OfferCreateForm.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ImagePlaceholder from '../../assets/imagePlaceholder.jpg';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import * as Yup from 'yup';
import i18n from '../../locales/i18n';

const OfferSchema = Yup.object().shape({
  place: Yup.string()
    .matches(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/, `${i18n.t('Input is not valid')}!`)
    .required(`${i18n.t('Location is required')}!`),
  name: Yup.string()
    .matches(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/, `${i18n.t('Input is not valid')}!`)
    .required(`${i18n.t('Place name is required')}!`),
  city: Yup.string()
    .matches(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/, `${i18n.t('Input is not valid')}!`)
    .required(`${i18n.t('City is required')}!`),
  maxPeople: Yup.number()
    .min(1)
    .required(`${i18n.t('Max people number is required')}!`),
  price: Yup.number().required(`${i18n.t('Price is required')}!`),
  description: Yup.string()
    .matches(/([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/, `${i18n.t('Input is not valid')}!`)
    .required(`${i18n.t('Description is required')}!`),
});

const InnerForm = (props: types.MyFormProps & FormikProps<types.FullFormValues>) => {
  const { touched, errors, setFieldValue, values } = props;
  const { t } = useTranslation();
  const dispatcher = useDispatch();
  const tags = useSelector((state: StoreType) => state.tripBrowser.tags);
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);
  const [photo, setPhoto] = useState(false);

  useEffect(() => {
    dispatcher(fetchTagsRequested());
  }, [dispatcher]);

  function valuetext(value: number) {
    return `${value}km`;
  }

  const addDays = (date: Date, days: number): Date => {
    let temp = new Date(date);
    temp.setDate(date.getDate() + days);
    return temp;
  };

  const [location, setLocation] = useState<string>('');
  const [suggestedListVisible, setSuggestedListVisible] = useState<boolean>(false);
  const [test, setTest] = useState<string[]>([ImagePlaceholder, ImagePlaceholder, ImagePlaceholder]);
  const [files, setFiles] = useState<File>();

  const handlePhotoChange = (selectorFiles: FileList | null, id: number) => {
    if (selectorFiles != null) {
      setFiles(selectorFiles[0]);
      setTest(test.map((img, i) => (i === id ? URL.createObjectURL(selectorFiles[0]) : img)));
    }
  };

  useEffect(() => {}, [files]);

  return (
    <Form className={styles.offerForm}>
      <Typography variant='h2' className={styles.offerForm__title}>
        {t('Create new offer')}
      </Typography>
      <div className={`${styles.offerForm__locationInput} ${styles.offerForm__case}`}>
        <Typography component='label' variant='subtitle2' className={styles.offerForm__label} htmlFor='location'>
          {t('Find place')}
        </Typography>
        <Field
          id='location'
          type='text'
          name='place'
          value={location}
          className={styles.offerForm__input}
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
                  radius: props.position.radius,
                });
                setSuggestedListVisible(false);
              }}
              onCityHover={(location: ISuggestedPlace) => {}}
              suggestedTrips={suggestedCities}
              activeTags={[]}
              changeVisible={() => null}
            />
          </div>
        )}
      </div>
      <div className={styles.offerForm__case}>
        <Typography component='label' variant='subtitle2' htmlFor='name' className={styles.offerForm__label}>
          {t('Offer name')}
        </Typography>
        <Field id='name' type='text' name='name' className={styles.offerForm__input} />
        {errors.name && touched.name && <div>{t(errors.name)}</div>}
      </div>
      <div className={styles.offerForm__case}>
        <div className={styles.offerForm__labelList}>
          <label htmlFor='file1' className={styles.offerForm__imageLabel}>
            <img src={test[0]} alt='' className={styles.offerForm__imageIcon} />
          </label>
          <label htmlFor='file2' className={styles.offerForm__imageLabel}>
            <img src={test[1]} alt='' className={styles.offerForm__imageIcon} />
          </label>
          <label htmlFor='file3' className={styles.offerForm__imageLabel}>
            <img src={test[2]} alt='' className={styles.offerForm__imageIcon} />
          </label>
        </div>
        <input
          type='file'
          id='file1'
          onChange={(e) => {
            handlePhotoChange(e.target.files, 0);
            if (e.target.files) {
              setFieldValue('file1', e.target.files[0]);
              setPhoto(true);
            }
          }}
          className={styles.offerForm__imageInput}
        />
        <input
          type='file'
          id='file2'
          onChange={(e) => {
            handlePhotoChange(e.target.files, 1);
            if (e.target.files) {
              setFieldValue('file2', e.target.files[0]);
              setPhoto(true);
            }
          }}
          className={styles.offerForm__imageInput}
        />
        <input
          type='file'
          id='file3'
          onChange={(e) => {
            handlePhotoChange(e.target.files, 2);
            if (e.target.files) {
              setFieldValue('file3', e.target.files[0]);
              setPhoto(true);
            }
          }}
          className={styles.offerForm__imageInput}
        />
      </div>

      <div className={`${styles.offerForm__date} ${styles.offerForm__case}`}>
        <Typography component='label' variant='subtitle2' htmlFor='begin' className={styles.offerForm__label}>
          {t('Begin')}
        </Typography>
        <DatePicker dateFormat='yyyy/MM/dd' selected={values.begin} onChange={(date) => setFieldValue('begin', date)} />
        {errors.begin && touched.begin && <div>{t(`Incorrect date`)}</div>}
      </div>
      <div className={`${styles.offerForm__date} ${styles.offerForm__case}`}>
        <Typography component='label' variant='subtitle2' htmlFor='end' className={styles.offerForm__label}>
          {t('End')}
        </Typography>
        <DatePicker
          dateFormat='yyyy/MM/dd'
          selected={values.end}
          maxDate={addDays(values.begin, 31)}
          onChange={(date) => setFieldValue('end', date)}
          minDate={values.begin}
        />
        {errors.end && touched.end && <div>{t(`Incorrect date`)}</div>}
      </div>
      <div className={styles.offerForm__case}>
        <Typography component='label' variant='subtitle2' htmlFor='city' className={styles.offerForm__label}>
          {t('City')}
        </Typography>
        <Field id='city' type='text' name='city' className={styles.offerForm__input} />
        {errors.city && touched.city && <div>{t(errors.city)}</div>}
      </div>
      <div className={styles.offerForm__case}>
        <Typography component='label' variant='subtitle2' htmlFor='maxPeople' className={styles.offerForm__label}>
          {t('Max people')}
        </Typography>
        <Field id='maxPeople' type='number' name='maxPeople' className={styles.offerForm__input} />
        {errors.maxPeople && touched.maxPeople && <div>{t(`Incorrect number`)}</div>}
      </div>
      <div className={styles.offerForm__case}>
        <Typography component='label' variant='subtitle2' htmlFor='price' className={styles.offerForm__label}>
          {t('Price')} (zł)
        </Typography>
        <Field id='price' type='number' name='price' className={styles.offerForm__input} />
        {errors.price && touched.price && <div>{t(`Incorrect number`)}</div>}
      </div>
      <div className={styles.offerForm__case}>
        <Typography component='label' variant='subtitle2' htmlFor='priceType' className={styles.offerForm__label}>
          {t('Price type')}
        </Typography>
        <div>
          <select id='priceType' name='priceType'>
            <option value='PER_PERSON'>{t('per person')}</option>
            <option value='PER_Person'>{t('per group')}</option>
          </select>
        </div>
      </div>
      <div className={styles.offerForm__case}>
        <Typography component='label' variant='subtitle2' htmlFor='radius' className={styles.offerForm__label}>
          {t('Radius')}
        </Typography>
        <Slider
          defaultValue={0.0}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider-small-steps'
          value={props.position.radius}
          step={0.1}
          marks
          min={0.0}
          max={5.0}
          valueLabelDisplay='auto'
          onChange={(event: React.ChangeEvent<{}>, value: number | number[]) => {
            props.handleChange(event);
            setFieldValue('radius', value);
            const position = {
              latitude: props.position.latitude,
              longitude: props.position.longitude,
              radius: values.radius || 0.0,
            };
            props.setPosition(position);
          }}
        />
        {errors.radius && touched.radius && <div>{t(`Incorrect number`)}</div>}
      </div>
      <div className={styles.offerForm__case}>
        <Typography component='label' variant='subtitle2' htmlFor='description' className={styles.offerForm__label}>
          {t('Description')}
        </Typography>
        <textarea
          id='description'
          name='description'
          value={values.description}
          className={styles.offerForm__input}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setFieldValue('description', event.target.value);
          }}
        ></textarea>
        {errors.radius && touched.radius && <div>{t(`Incorrect number`)}</div>}
      </div>
      <div className={styles.offerForm__case}>
        <ul className={styles.offerForm__tagList}>
          {tags.map((tag: ITag) => (
            <li key={tag.id} className={styles.offerForm__tag}>
              <Checkbox name='tags' value={tag.name} valueKey={tag.id} />
            </li>
          ))}
        </ul>
      </div>
      <Button variant='contained' disabled={!photo} color='primary' type='submit' className={styles.offerForm__submitButton}>
        {t('Submit')}
      </Button>
    </Form>
  );
};

const OfferCreateForm = withFormik<types.MyFormProps, types.FullFormValues>({
  mapPropsToValues: (props: types.MyFormProps) => {
    const { longitude, latitude, radius } = props.position;
    return {
      place: props.place || '',
      begin: new Date(),
      city: '',
      end: new Date(),
      lat: latitude || 0.0,
      lon: longitude || 0.0,
      file1: new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      }),
      file2: new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      }),
      file3: new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      }),
      maxPeople: 0,
      name: '',
      price: 0.0,
      priceType: 'PER_PERSON',
      radius: radius || 0.0,
      tags: [],
      description: '',
    };
  },
  validationSchema: OfferSchema,

  handleSubmit: (values: types.FullFormValues, { props }) => {
    values.radius *= 1000;
    props.onSubmit(values);
    values.radius /= 1000;
  },
})(InnerForm);

export default OfferCreateForm;
