import React from 'react';
import { bool, string, shape } from 'prop-types';
import TextField from '@material-ui/core/TextField';

import CustomNumberField from './customNumberField';

const NumberField = ({ adornment, label, id, disabled, ...rest }) => {
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
    />
  );
};

NumberField.propTypes = {
  id: string.isRequired,
  adornment: shape({}),
  label: string.isRequired,
  disabled: bool,
};

NumberField.defaultProps = {
  adornment: undefined,
  disabled: false,
};

export default NumberField;
