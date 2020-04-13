import React, { useState, useEffect } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { bool, func, string, number } from 'prop-types';
import NumberFormat from 'react-number-format';
import DeleteIcon from '@material-ui/icons/Delete';

const ServiceModal = ({
  show,
  title,
  onClose,
  onDelete,
  onSave,
  editMode,
  name,
  id,
  duration,
  cost,
}) => {
  const [localCost, setCost] = useState(null);
  const [localDuration, setDuration] = useState(null);
  const [localName, setName] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (editMode) {
      setCost(cost);
    }
  }, [cost]);

  useEffect(() => {
    if (editMode) {
      setDuration(duration);
    }
  }, [duration]);

  useEffect(() => {
    if (editMode) {
      setName(name);
    }
  }, [name]);

  const handleClose = () => {
    setShowAlert(false);
    onClose();
  };

  const handleDelete = () => {
    onDelete(id);
    onClose();
  };

  const handleSave = () => {
    setShowAlert(false);
    if (
      localName &&
      localName !== '' &&
      localCost !== null &&
      localCost > 0.0 &&
      localDuration !== null &&
      localDuration > 0.0
    ) {
      onSave(!editMode, localName, localDuration, localCost, true, id);
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
              value={localName}
              onChange={(e) => setName(e.target.value)}
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
              value={localDuration}
              onValueChange={(e) => setDuration(e.value)}
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
              value={localCost}
              onValueChange={(e) => setCost(e.value)}
            />
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {editMode && (
          <div>
            <Button variant='link' onClick={handleDelete}>
              <DeleteIcon /> Delete
            </Button>
          </div>
        )}
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
  onDelete: func.isRequired,
  onSave: func.isRequired,
  editMode: bool.isRequired,
  id: string,
  name: string,
  duration: number,
  cost: number,
};

ServiceModal.defaultProps = {
  name: '',
  id: 'NaC',
  duration: 0,
  cost: 0.0,
};

export default ServiceModal;
