import React from 'react';
import { bool, string, shape } from 'prop-types';
import TextField from '@material-ui/core/TextField';

import CustomPhoneField from './customPhoneField';

const NumberField = ({ label, id, disabled, ...rest }) => {
  return (
    <TextField
      label={label}
      id={id}
      InputProps={{
        inputComponent: CustomPhoneField,
        inputProps: { ...rest },
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
