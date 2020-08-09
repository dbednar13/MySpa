import React from 'react';
import { bool } from 'prop-types';
import { InputAdornment } from '@material-ui/core';

import {
  addonPropType,
  addonDefaultProps,
} from '../../../../../common/props/addonPropType';
import {
  NumberFormikField,
  TextFormikField,
} from '../../../../../common/formik';

const AddonData = ({ addon, isModal }) => {
  const idSuffix = isModal ? '' : `-${addon.id}`;

  const validateCost = (value) => {
    if (value === undefined || value <= 0) {
      return 'A cost is required';
    }
    return '';
  };

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
            name='addon.name'
            textField={{
              label: 'Addon Name:',
              id: `addon.name${idSuffix}`,
              placeholder: 'Addon Name',
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
          name='addon.cost'
          numberField={{
            id: `addon.cost${idSuffix}`,
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
          validate={(value) => {
            return validateCost(value);
          }}
        />
      </div>
    </>
  );
};

AddonData.propTypes = {
  addon: addonPropType,
  isModal: bool,
};

AddonData.defaultProps = {
  addon: addonDefaultProps,
  isModal: false,
};

export default AddonData;
