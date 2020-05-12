import React from 'react';
import { bool, string } from 'prop-types';
import TextField from '@material-ui/core/TextField';

const PhoneField = ({ id, label, disabled }) => {
  return <TextField id={id} label={label} disabled={disabled} />;
};

PhoneField.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  disabled: bool,
};

PhoneField.defaultProps = {
  disabled: false,
};

export default PhoneField;
