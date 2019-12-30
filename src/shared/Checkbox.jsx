import React from 'react';
import { Field } from 'formik';

const Checkbox = props => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
          <input
            type='checkbox'
            name={props.name}
            value={props.value}
            checked={field.value.includes(props.valueKey)}
            onChange={() => {
              if (field.value.includes(props.valueKey)) {
                for (let i = 0; i < field.value.length; i++) {
                  if (field.value[i] === props.valueKey) {
                    field.value.splice(i, 1);
                  }
                }
              } else {
                const nextValue = field.value.concat(props.valueKey);
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
