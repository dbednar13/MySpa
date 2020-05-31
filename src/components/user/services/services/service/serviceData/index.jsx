import React from 'react';
import { bool } from 'prop-types';
import { InputAdornment } from '@material-ui/core';

import { servicePropType, serviceDefaultProps } from '../servicePropType';
import {
  NumberFormikField,
  TextFormikField,
} from '../../../../../common/formik';

const ServiceData = ({ service, isModal }) => {
  const idSuffix = isModal ? '' : `-${service.id}`;

  const validateName = (value) => {
    if (value === undefined) {
      return 'Please enter a name';
    }
    const name = value.trim();
    if (name === '' || name.length < 1) {
      return 'Please enter a name';
    }

    return '';
  };

  return (
    <>
      {isModal && (
        <div className='pb-3 pr-3 pl-3'>
          <TextFormikField
            name='service.name'
            textField={{
              label: 'Service Name:',
              id: `service.name${idSuffix}`,
              placeholder: 'Service Name',
              disabled: !isModal,
            }}
            validate={(value) => {
              return validateName(value);
            }}
          />
        </div>
      )}
      <div className='pb-3 pr-3 pl-3'>
        <NumberFormikField
          name='service.duration'
          numberField={{
            id: `service.duration${idSuffix}`,
            label: 'Duration (minutes):',
            placeholder: 'Minutes',
            decimalScale: '0',
            allowNegative: false,
            disabled: !isModal,
          }}
        />
      </div>
      <div className='pb-3 pr-3 pl-3'>
        <NumberFormikField
          name='service.cost'
          numberField={{
            id: `service.cost${idSuffix}`,
            label: 'Cost:',
            decimalScale: '2',
            allowNegative: false,
            disabled: !isModal,
            thousandSeparator: ',',
            fixedDecimalScale: true,
            allowLeadingZeros: false,
            adornment: {
              startAdornment: (
                <InputAdornment position='start'>$</InputAdornment>
              ),
            },
          }}
        />
      </div>
    </>
  );
};

ServiceData.propTypes = {
  service: servicePropType,
  isModal: bool,
};

ServiceData.defaultProps = {
  service: serviceDefaultProps,
  isModal: false,
};

export default ServiceData;
