import React from 'react';
import { number, string } from 'prop-types';
import NumberFormat from 'react-number-format';

import CurrencyField from '../../../common/currencyField';

const Service = ({ length, cost, id }) => {
  return (
    <>
      <div className='d-flex pb-2 pl-2'>
        <label htmlFor={`serviceLength-${id}`}>
          Service length (minutes):{' '}
          <NumberFormat
            id={`serviceLength-${id}`}
            decimalScale='0'
            allowNegative={false}
            value={length}
            disabled
          />
        </label>
      </div>
      <CurrencyField
        label=' Service Cost:'
        id={`cost-${id}`}
        value={cost}
        disabled
      />
    </>
  );
};

Service.propTypes = {
  id: string.isRequired,
  length: number.isRequired,
  cost: number.isRequired,
};

export default Service;
