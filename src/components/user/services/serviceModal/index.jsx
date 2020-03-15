import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { bool, func, string } from 'prop-types';
import NumberFormat from 'react-number-format';

const ServiceModal = ({ show, title, onClose, onSave, editMode }) => {
  const [cost, setCost] = useState(null);
  const [duration, setDuration] = useState(null);
  const [name, setName] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setShowAlert(false);
    onClose();
  };

  const handleSave = () => {
    setShowAlert(false);
    if (
      name &&
      name !== '' &&
      cost !== null &&
      cost > 0.0 &&
      duration !== null &&
      duration > 0.0
    ) {
      onSave(true, name, duration, cost, true);
      onClose();
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && (
          <Alert variant='danger'>
            Please enter a name, duration and a cost
          </Alert>
        )}
        <div className='d-flex pb-2'>
          <label htmlFor='name'>
            Service Name:{' '}
            <input
              id='name'
              type='text'
              placeholder='Serivce Name'
              onChange={e => setName(e.target.value)}
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
              onValueChange={e => setDuration(e.value)}
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
              onValueChange={e => setCost(e.value)}
            />
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ServiceModal.propTypes = {
  show: bool.isRequired,
  title: string.isRequired,
  onClose: func.isRequired,
  onSave: func.isRequired,
  editMode: bool.isRequired
};

export default ServiceModal;
