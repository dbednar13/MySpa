import React, { useState } from 'react';
import { string, number } from 'prop-types';
import { Divider, InputAdornment, TextField } from '@material-ui/core';

import NumberField from '../../common/numberField';
import PhoneField from '../../common/phoneField';

const Client = ({ id, emailAddress, phoneNumber, discount }) => {
  const [localEmail, setLocalEmail] = useState(emailAddress);

  const setEmail = (value) => {
    setLocalEmail(value);
  };

  return (
    <>
      <div className='pb-3'>
        <TextField
          label='Email Address:'
          id={`emailAddress-${id}`}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={localEmail}
          fullWidth
          disabled
        />
      </div>
      <div className='pb-3'>
        <PhoneField
          id={`phoneNumber-${id}`}
          label='Phone Number:'
          value={phoneNumber}
          disabled
        />
      </div>
      <div className='pb-3'>
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
      <div className='pb-3'>
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
