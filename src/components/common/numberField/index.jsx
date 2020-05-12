import React from 'react';
import { bool, string } from 'prop-types';
import TextField from '@material-ui/core/TextField';

import CustomNumberField from './customNumberField';

const NumberField = ({ label, id, disabled, ...rest}) => {
  return (
    <TextField
      label={label}
      id={id}
      InputProps={{ inputComponent: CustomNumberField, inputProps: {...rest} }}      
      disabled={disabled}
    />
  );
};

NumberField.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  disabled: bool,
};

NumberField.defaultProps = {
  disabled: false
};

export default NumberField;
