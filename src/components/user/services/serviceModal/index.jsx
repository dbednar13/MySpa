import React from 'react';
import { bool, func, string } from 'prop-types';
import NumberFormat from 'react-number-format';

import InternalModal from '../../../modal';

const ServiceModal = ({ show, title, onClose, onSave }) => {
  const body = (
    <>
      <div className='d-flex pb-2'>
        <label htmlFor='name'>
          Service Name:{' '}
          <input id='name' type='text' placeholder='Serivce Name' />
        </label>
      </div>
      <div className='d-flex pb-2'>
        <label htmlFor='serviceLength'>
          Service length (minutes):{' '}
          <NumberFormat
            id='serviceLength'
            decimalScale='0'
            allowNegative={false}
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
          />
        </label>
      </div>
    </>
  );

  return (
    <InternalModal
      body={body}
      onClose={onClose}
      onSave={onSave}
      show={show}
      title={title}
    />
  );
};

ServiceModal.propTypes = {
  show: bool.isRequired,
  title: string.isRequired,
  onClose: func.isRequired,
  onSave: func.isRequired
};

export default ServiceModal;
