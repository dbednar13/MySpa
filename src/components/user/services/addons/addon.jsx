import React from 'react';
import { number, string } from 'prop-types';
import NumberFormat from 'react-number-format';

const Addon = ({ cost, id }) => {
  return (
    <>
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

Addon.propTypes = {
  id: string.isRequired,
  cost: number.isRequired
};

export default Addon;
