import React from 'react';
import { bool } from 'prop-types';
import { Divider, InputAdornment, TextField } from '@material-ui/core';

import { clientPropType, clientDefaultProps } from '../clientPropType';
import NumberField from '../../../common/numberField';
import PhoneField from '../../../common/phoneField';
import TextFormikField from '../../../common/formik/textFormikField';

const ClientData = ({ client, isModal }) => {
  const idSuffix = isModal ? '' : `-${client.id}`;
  return (
    <>
      {isModal && (
        <div className='pb-3 pr-3 pl-3'>
          <TextFormikField
            name='client.name'
            textField={{
              label: 'Client Name:',
              id: `client.name${idSuffix}`,
              placeholder: 'Client Name',
              disabled: !isModal,
            }}
          />
        </div>
      )}
      <div className='pb-3 pr-3 pl-3'>
        <TextField
          name='client.emailAddress'
          label='Email Address:'
          id={`client.emailAddress${idSuffix}`}
          placeholder='Email'
          fullWidth
          disabled={!isModal}
        />
      </div>
      <div className='pb-3 pr-3 pl-3'>
        <PhoneField
          name='client.phoneNumber'
          id={`client.phoneNumber${idSuffix}`}
          label='Phone Number:'
          disabled={!isModal}
        />
      </div>
      <div className='pb-3 pr-3 pl-3'>
        <NumberField
          name='client.discount'
          id={`client.discount${idSuffix}`}
          label='Service Discount:'
          decimalScale='0'
          allowNegative={false}
          adornment={{
            endAdornment: <InputAdornment position='end'>%</InputAdornment>,
          }}
          disabled={!isModal}
        />
      </div>
      <Divider variant='middle' />
      <div className='pb-3 pr-3 pl-3'>
        <TextField
          name='client.clientNotes'
          id={`client.clientNotes${idSuffix}`}
          label='Client Notes'
          placeholder='Notes'
          fullWidth
          multiline
          rows={4}
          disabled={!isModal}
        />
      </div>
    </>
  );
};

ClientData.propTypes = {
  client: clientPropType,
  isModal: bool,
};

ClientData.defaultProps = {
  client: clientDefaultProps,
  isModal: false,
};

export default ClientData;
