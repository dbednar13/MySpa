import React from 'react';
import { number, string } from 'prop-types';
import NumberFormat from 'react-number-format';

const Service = ({ length, cost, id }) => {
  return (
    <>
      <div className='d-flex pb-2'>
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
      <div className='d-flex pb-2'>
        <label htmlFor={`cost-${id}`}>
          Service cost:{' '}
          <NumberFormat
            id={`cost-${id}`}
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
  id: string.isRequired,
  length: number.isRequired,
  cost: number.isRequired
};

export default Service;
