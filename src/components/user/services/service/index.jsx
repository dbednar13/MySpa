import React from 'react';
import { number } from 'prop-types';
import NumberFormat from 'react-number-format';

const Service = ({ length, cost }) => {
  return (
    <>
      <div className='d-flex pb-2'>
        <label htmlFor='serviceLength'>
          Service length (minutes):{' '}
          <NumberFormat
            id='serviceLength'
            decimalScale='0'
            allowNegative={false}
            value={length}
            disabled
          />
        </label>
      </div>
      <div className='d-flex pb-2'>
        <label htmlFor='cost'>
          Service cost:{' '}
          <NumberFormat
            id='cost'
            decimalScale='2'
            allowNegative={false}
            prefix='$'
            value={cost}
            disabled
          />
        </label>
      </div>
    </>
  );
};

Service.propTypes = {
  length: number.isRequired,
  cost: number.isRequired
};

export default Service;
