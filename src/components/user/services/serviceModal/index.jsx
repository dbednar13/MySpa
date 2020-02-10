import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { bool, func, string } from 'prop-types';
import NumberFormat from 'react-number-format';

const ServiceModal = ({ show, title, onClose, onSave }) => {
  const handleSave = data => {
    onSave(data);
  };

  return (
    <>
      <Modal centered show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex'>
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
                decimalScale='0'
                allowNegative={false}
                prefix='$'
              />
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ServiceModal.propTypes = {
  show: bool.isRequired,
  title: string.isRequired,
  onClose: func.isRequired,
  onSave: func.isRequired
};

export default ServiceModal;
