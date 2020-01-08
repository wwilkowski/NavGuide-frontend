import React from 'react';
import { Field } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckboxComponent = props => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <FormControlLabel
          control={
            <Checkbox
              color='primary'
              name={props.name}
              value={props.valueKey}
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
          }
          label={props.value}
        />
      )}
    </Field>
  );
};

export default CheckboxComponent;
