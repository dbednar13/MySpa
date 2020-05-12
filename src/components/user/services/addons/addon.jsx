import React from 'react';
import { number, string } from 'prop-types';

import CurrencyField from '../../../common/currencyField';

const Addon = ({ cost, id }) => {
  return (
    <>
      <div className='pb-2'>
        <CurrencyField
          id={`cost-${id}`}
          label='Addon Cost:'
          value={cost}
          disabled
        />
      </div>
    </>
  );
};

Addon.propTypes = {
  id: string.isRequired,
  cost: number.isRequired,
};

export default Addon;
