import React from 'react';
import { useField } from 'formik';
import { string, shape, func } from 'prop-types';

import PhoneField from '../phoneField';

export default function PhoneFormikField({ name, validate, phoneField }) {
  const [field, meta, helpers] = useField({ name, validate });
  const { value } = field;
  const { error, touched } = meta;
  const { setValue, setTouched, setError } = helpers;

  const handleOnChange = (input) => {
    setTouched(true);
    setValue(input.value);
    if (validate) {
      setError(validate(input.value));
    }
  };

  const helperText = () => {
    return error && touched ? error : '';
  };

  return (
    <PhoneField
      onChange={handleOnChange}
      value={value}
      error={error !== undefined && error !== ''}
      helperText={helperText()}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...phoneField}
    />
  );
}

PhoneFormikField.propTypes = {
  name: string.isRequired,
  phoneField: shape({}).isRequired,
  errorText: string,
  validate: func,
};

PhoneFormikField.defaultProps = {
  errorText: '',
  validate: undefined,
};
