/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { func } from 'prop-types';
import NumberFormat from 'react-number-format';

function CustomPhoneField({ inputRef, onChange, ...rest }) {
  return (
    <NumberFormat
      getInputRef={inputRef}
      onValueChange={(e) => {
        onChange(e);
      }}
      format='+1 (###) ###-####'
      allowEmptyFormatting
      mask='_'
      {...rest}
    />
  );
}

CustomPhoneField.propTypes = {
  inputRef: func.isRequired,
  onChange: func,
};

CustomPhoneField.defaultProps = {
  onChange: undefined,
};

export default CustomPhoneField;
