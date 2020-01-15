import React from 'react';
import { CurrencyInput, NumberInput } from '../../../../numberInput';

const Details = () => {
  return (
    <>
      <div>
        <label htmlFor='name' className='pb-0'>
          Service Name:{' '}
          <input
            className='pb-0'
            id='name'
            type='text'
            placeholder='Serivce Name'
          />
        </label>
      </div>
      <div className='pb-2'>
        Service length (minutes): <NumberInput />
      </div>
      <div className='pb-2'>
        Service cost: <CurrencyInput />
      </div>
    </>
  );
};

export default Details;
