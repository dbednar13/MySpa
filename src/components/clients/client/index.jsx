import React, { useState } from 'react';
import { string, number } from 'prop-types';
import NumberFormat from 'react-number-format';
import { Divider, InputAdornment, TextField } from '@material-ui/core';

import NumberField from '../../common/numberField';

const Client = ({ id, emailAddress, phoneNumber, discount }) => {
  const [localEmail, setLocalEmail] = useState(emailAddress);

  const setEmail = (value) => {
    setLocalEmail(value);
  };

  return (
    <>
      <div className='d-flex pb-2 pl-2'>
        <label htmlFor={`emailAddress-${id}`}>
          Email Address:{' '}
          <input
            id={`emailAddress-${id}`}
            type='text'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={localEmail}
            disabled
          />
        </label>
      </div>
      <div className='d-flex pb-2 pl-2'>
        <label htmlFor={`phoneNumber-${id}`}>
          Phone Number:{' '}
          <NumberFormat
            id={`phoneNumber-${id}`}
            format='+1 (###) ###-####'
            allowEmptyFormatting
            mask='_'
            value={phoneNumber}
            disabled
          />
        </label>
      </div>
      <div className='pb-2'>
        <NumberField
          id={`discount-${id}`}
          label='Service Discount:'
          decimalScale='0'
          allowNegative={false}
          value={discount}
          disabled
          adornment={{
            endAdornment: <InputAdornment position='end'>%</InputAdornment>,
          }}
        />
      </div>
      <Divider variant='middle' />
      <div className='d-flex pb-2 pl-2'>
        <TextField
          id={`ClientNotes-${id}`}
          label='Client Notes'
          disabled
          multiline
          rows={4}
          rowsMax={4}
          fullWidth
        />
      </div>
    </>
  );
};

Client.propTypes = {
  id: string,
  phoneNumber: string,
  emailAddress: string,
  discount: number,
};

Client.defaultProps = {
  id: '',
  phoneNumber: '',
  emailAddress: '',
  discount: 0,
};

export default Client;
