import React from 'react';
import { bool } from 'prop-types';
import { Divider, InputAdornment } from '@material-ui/core';

import { clientPropType, clientDefaultProps } from '../clientPropType';
import {
  NumberFormikField,
  PhoneFormikField,
  TextFormikField,
} from '../../../common/formik';

import {
  validateName,
  validateEmail,
  validatePhone,
} from '../../../../validators';

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
            validate={(value) => {
              return validateName(value);
            }}
          />
        </div>
      )}
      <div className='pb-3 pr-3 pl-3'>
        <TextFormikField
          name='client.emailAddress'
          label='Email Address:'
          textField={{
            id: `client.emailAddress${idSuffix}`,
            placeholder: 'Email',
            fullWidth: true,
            disabled: !isModal,
          }}
          validate={(value) => {
            return validateEmail(value);
          }}
        />
      </div>
      <div className='pb-3 pr-3 pl-3'>
        <PhoneFormikField
          name='client.phoneNumber'
          phoneField={{
            id: `client.phoneNumber${idSuffix}`,
            label: 'Phone Number:',
            disabled: !isModal,
          }}
          validate={(value) => {
            return validatePhone(value);
          }}
        />
      </div>
      <div className='pb-3 pr-3 pl-3'>
        <NumberFormikField
          name='client.discount'
          numberField={{
            id: `client.discount${idSuffix}`,
            label: 'Service Discount:',
            decimalScale: '0',
            allowNegative: false,
            adornment: {
              endAdornment: <InputAdornment position='end'>%</InputAdornment>,
            },
            disabled: !isModal,
          }}
        />
      </div>
      <Divider variant='middle' />
      <div className='pb-3 pr-3 pl-3'>
        <TextFormikField
          name='client.notes'
          textField={{
            id: `client.clientNotes${idSuffix}`,
            label: 'Client Notes',
            placeholder: 'Notes',
            fullWidth: true,
            multiline: true,
            rows: 4,
            disabled: !isModal,
          }}
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
