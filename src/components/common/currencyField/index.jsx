import React from 'react';
import { bool, string } from 'prop-types';
import TextField from '@material-ui/core/TextField';

import CustomMoneyFormat from './customMoneyFormat';

const CurrencyField = (props) => {
  const { label, id, ...other } = props;
  return (
    <TextField
      label={label}
      id={id}
      InputProps={{ inputComponent: CustomMoneyFormat }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
};

CurrencyField.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  disabled: bool,
};

CurrencyField.defaultProps = {
  disabled: false,
};

export default CurrencyField;
