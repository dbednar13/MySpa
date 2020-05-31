import React from 'react';
import { number, string } from 'prop-types';

import CurrencyField from '../../../common/currencyField';

const Addon = ({ cost, id }) => {
  return (
    <>
      <div className='pb-3 pr-3 pl-3'>
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
