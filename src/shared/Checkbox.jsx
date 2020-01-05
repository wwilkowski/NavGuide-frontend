import React from 'react';
import { Field } from 'formik';

const Checkbox = props => {
  console.log(props.valueKey);
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
          <input
            type='checkbox'
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
          {props.value}
        </label>
      )}
    </Field>
  );
};

export default Checkbox;
