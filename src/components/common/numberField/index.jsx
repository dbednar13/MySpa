import React from 'react';
import { bool, string } from 'prop-types';
import TextField from '@material-ui/core/TextField';

import CustomNumberField from './customNumberField';

const NumberField = (props) => {
  const { label, id, ...other } = props;
  return (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      label={label}
      id={id}
      InputProps={{ inputComponent: CustomNumberField }}
    />
  );
};

NumberField.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  disabled: bool,
};

NumberField.defaultProps = {
  disabled: false,
};

export default NumberField;
