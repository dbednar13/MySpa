/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { func } from 'prop-types';
import NumberFormat from 'react-number-format';

function CustomMoneyFormat(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(e) => {
        onChange(e);
      }}
      prefix='$'
      thousandSeparator=','
      decimalSeparator='.'
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      allowLeadingZeros={false}
    />
  );
}

CustomMoneyFormat.propTypes = {
  inputRef: func.isRequired,
  onChange: func,
};

CustomMoneyFormat.defaultProps = {
  onChange: undefined,
};

export default CustomMoneyFormat;
