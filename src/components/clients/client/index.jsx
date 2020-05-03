import React, { useState } from 'react';
import { string, number } from 'prop-types';
import NumberFormat from 'react-number-format';
import { Divider, TextField } from '@material-ui/core';

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
      <div className='d-flex pb-2 pl-2'>
        <label htmlFor={`discount-${id}`}>
          Service Discount:{' '}
          <NumberFormat
            id={`discount-${id}`}
            decimalScale='0'
            allowNegative={false}
            suffix='%'
            value={discount}
            disabled
          />
        </label>
      </div>
      <Divider variant='middle' />
      <div className='d-flex pb-2 pl-2'>
        <TextField
          id={`ClientNotes-${id}`}
          label='Client Notes'
          disabled
          multiline
          rows={4}
          maxRows={4}
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
