import React from 'react';
import { useField } from 'formik';
import { string, shape, func } from 'prop-types';

import NumberField from '../numberField';

export default function NumberFormikField({ name, validate, numberField }) {
  const [field, meta, helpers] = useField({ name, validate });
  const { value } = field;
  const { error, touched } = meta;
  const { setValue, setTouched, setError } = helpers;

  const handleOnChange = (input) => {
    setTouched(true);
    setValue(input.floatValue);
    if (validate) {
      setError(validate(input.floatValue));
    }
  };

  const helperText = () => {
    return error && touched ? error : '';
  };

  return (
    <NumberField
      onChange={handleOnChange}
      value={value}
      error={error !== undefined && error !== ''}
      helperText={helperText()}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...numberField}
    />
  );
}

NumberFormikField.propTypes = {
  name: string.isRequired,
  numberField: shape({}).isRequired,
  errorText: string,
  validate: func,
};

NumberFormikField.defaultProps = {
  errorText: '',
  validate: undefined,
};
