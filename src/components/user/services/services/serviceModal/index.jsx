import React, { useState, useEffect } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { bool, func, string, number } from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

import { TextField } from '@material-ui/core';
import CurrencyField from '../../../../common/currencyField';
import NumberField from '../../../../common/numberField';

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
        <div className='pb-3'>
          <TextField
            id='name'
            placeholder='Service Name'
            value={localName}
            onChange={(e) => setName(e.target.value)}
            label='Service Name:'
          />
        </div>
        <div className='pb-3'>
          <NumberField
            label='Service length (minutes):'
            id='serviceLength'
            decimalScale='0'
            allowNegative={false}
            value={localDuration}
            onChange={(e) => setDuration(e.value)}
            disabled
          />
        </div>
        <div className='pb-3'>
          <CurrencyField
            label='Service cost:'
            id='cost'
            value={localCost}
            onChange={(e) => {
              setCost(e.value);
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer />
      <div className='d-flex justify-content-between pb-3'>
        <div>
          {editMode && (
            <Button variant='link' onClick={handleDelete}>
              <DeleteIcon /> Delete
            </Button>
          )}
        </div>
        <div className='d-flex pr-2'>
          <div className='pr-2'>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </div>
          <div>
            <Button variant='primary' onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
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
