import React from 'react';
import { Field } from 'formik';
import styles from './Checkbox.module.scss';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

const CheckboxComponent = props => {
  const { t } = useTranslation();
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <>
          <input
            id={props.value}
            type='checkbox'
            name={props.name}
            value={props.valueKey}
            className={styles.checkboxField}
            checked={field.value && field.value.includes(props.valueKey) ? true : false}
            onChange={() => {
              if (field.value && field.value.includes(props.valueKey)) {
                const newInterests = field.value.filter(interest => interest !== props.valueKey);
                form.setFieldValue(props.name, newInterests);
              } else {
                const nextValue = field.value ? [...field.value, props.valueKey] : [props.valueKey];
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          <Typography component='label' variant='subtitle1' htmlFor={props.value} className={styles.checkboxLabel}>
            {t(props.value)}
          </Typography>
        </>
      )}
    </Field>
  );
};

export default CheckboxComponent;
