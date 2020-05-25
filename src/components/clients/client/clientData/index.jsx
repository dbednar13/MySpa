import React from 'react';
import { bool } from 'prop-types';
import { Divider, InputAdornment } from '@material-ui/core';
import * as EmailValidator from 'email-validator';

import { clientPropType, clientDefaultProps } from '../clientPropType';
import PhoneField from '../../../common/phoneField';
import { NumberFormikField, TextFormikField } from '../../../common/formik';

const ClientData = ({ client, isModal }) => {
  const idSuffix = isModal ? '' : `-${client.id}`;

  const validateName = (validate, value) => {
    if (validate) {
      if (value === undefined) {
        return 'Please enter a name';
      }
      const name = value.trim();
      if (name === '' || name.length < 1) {
        return 'Please enter a name';
      }
    }
    return '';
  };

  const validateEmail = (validate, value) => {
    if (validate) {
      if (value === undefined) {
        return 'Please enter an email';
      }
      const email = value.trim();
      if (email === '') {
        return 'Please enter an email';
      }

      if (!EmailValidator.validate(email)) {
        return 'Please enter a valid email address';
      }
    }

    return '';
  };

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
              return validateName(isModal, value);
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
            return validateEmail(isModal, value);
          }}
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
