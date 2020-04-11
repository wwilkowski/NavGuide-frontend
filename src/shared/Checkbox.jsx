import React from 'react';
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  hiddenField: {
    display: 'none',
    '&:checked + label': {
      backgroundColor: '#e64740',
      color: '#ffffff',
    },
  },
  label: {
    border: '1px solid #dbdbdb',
    borderRadius: '5px',
    color: '#333333',
    padding: '0.3rem 0.8rem',
    cursor: 'pointer',
    background: '#ffffff',
    transition: 'color 0.2s, background-color 0.2s',
    whiteSpace: 'nowrap',
  },
});

const CheckboxComponent = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <>
          <input
            id={props.value}
            type='checkbox'
            name={props.name}
            value={props.valueKey}
            className={classes.hiddenField}
            checked={field.value && field.value.includes(props.valueKey) ? true : false}
            onChange={() => {
              if (field.value && field.value.includes(props.valueKey)) {
                const newInterests = field.value.filter((interest) => interest !== props.valueKey);
                form.setFieldValue(props.name, newInterests);
              } else {
                const nextValue = field.value ? [...field.value, props.valueKey] : [props.valueKey];
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          <Typography component='label' variant='subtitle1' htmlFor={props.value} className={classes.label}>
            {t(props.value)}
          </Typography>
        </>
      )}
    </Field>
  );
};

export default CheckboxComponent;
