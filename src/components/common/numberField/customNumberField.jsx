/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { func } from 'prop-types';
import NumberFormat from 'react-number-format';

function CustomNumberField({ inputRef, onChange, ...rest }) {
  return (
    <NumberFormat
      getInputRef={inputRef}
      onValueChange={(e) => {
        onChange(e);
      }}
      {...rest}
    />
  );
}

CustomNumberField.propTypes = {
  inputRef: func.isRequired,
  onChange: func,
};

CustomNumberField.defaultProps = {
  onChange: undefined,
};

export default CustomNumberField;
