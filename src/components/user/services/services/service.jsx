import React from 'react';
import { number, string } from 'prop-types';

import CurrencyField from '../../../common/currencyField';
import NumberField from '../../../common/numberField';

const Service = ({ length, cost, id }) => {
  return (
    <>
      <div className='pb-3 pr-3 pl-3'>
        <NumberField
          label='Service length (minutes):'
          id={`serviceLength-${id}`}
          decimalScale='0'
          allowNegative={false}
          value={length}
          disabled
        />
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
