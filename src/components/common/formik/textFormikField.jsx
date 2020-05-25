import React from 'react';
import { useField } from 'formik';
import { string, shape, func } from 'prop-types';

import TextField from '@material-ui/core/TextField';

export default function TextFormikField({ name, validate, textField }) {
  const [field, meta, helpers] = useField({ name, validate });
  const { value } = field;
  const { error, touched } = meta;
  const { setValue, setTouched, setError } = helpers;

  const handleOnChange = (input) => {
    setTouched(true);
    setValue(input.target.value);
    setError(validate(input.target.value));
  };

  const helperText = () => {
    return error && touched ? error : '';
  };

  return (
    <TextField
      onChange={handleOnChange}
      value={value}
      error={error !== undefined && error !== ''}
      helperText={helperText()}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...textField}
    />
  );
}

TextFormikField.propTypes = {
  name: string.isRequired,
  textField: shape({}).isRequired,
  errorText: string,
  validate: func,
};

TextFormikField.defaultProps = {
  errorText: '',
  validate: undefined,
};
