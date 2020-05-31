import React from 'react';
import { bool, string, shape } from 'prop-types';
import TextField from '@material-ui/core/TextField';

import CustomNumberField from './customNumberField';

const NumberField = ({
  adornment,
  label,
  id,
  disabled,
  error,
  helperText,
  ...rest
}) => {
  return (
    <TextField
      label={label}
      id={id}
      InputProps={{
        inputComponent: CustomNumberField,
        inputProps: { ...rest },
        ...adornment,
      }}
      disabled={disabled}
      error={error}
      helperText={helperText}
    />
  );
};

NumberField.propTypes = {
  id: string.isRequired,
  adornment: shape({}),
  label: string.isRequired,
  disabled: bool,
  error: bool,
  helperText: string,
};

NumberField.defaultProps = {
  adornment: undefined,
  disabled: false,
  error: false,
  helperText: '',
};

export default NumberField;
