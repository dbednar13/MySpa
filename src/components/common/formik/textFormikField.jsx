import React from 'react';
import { Field, getIn } from 'formik';
import { string, shape, func } from 'prop-types';

import TextField from '@material-ui/core/TextField';

export default function TextFormikField({ name, validate, textField }) {
  return (
    <Field name={name} validate={validate}>
      {(innerProps) => {
        const {
          field: { value },
          form: { errors, setFieldValue },
        } = innerProps;
        const error = getIn(errors, name);

        function handleOnChange(input) {
          setFieldValue(name, input.target.value);
        }

        return (
          <TextField
            onChange={handleOnChange}
            value={value}
            error={error}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...textField}
          />
        );
      }}
    </Field>
  );
}

TextFormikField.propTypes = {
  name: string.isRequired,
  textField: shape({}).isRequired,
  validate: func,
};

TextFormikField.defaultProps = {
  validate: undefined,
};
