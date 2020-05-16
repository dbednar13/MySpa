import React, { useState, useEffect } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { bool, func, string, number } from 'prop-types';
import { TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import CurrencyField from '../../../../common/currencyField';

const AddonModal = ({
  show,
  id,
  title,
  name,
  cost,
  onClose,
  onDelete,
  onSave,
  editMode,
}) => {
  const [localCost, setCost] = useState(0.0);
  const [localName, setName] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (editMode) {
      setName(name);
    }
  }, [name]);

  useEffect(() => {
    if (editMode) {
      setCost(cost);
    }
  }, [cost]);

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
      localCost > 0.0
    ) {
      onSave(!editMode, localName, localCost, true);
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
          <Alert variant='danger'>Please enter a name and a cost</Alert>
        )}
        <div className='pb-3 pr-3 pl-3'>
          <TextField
            label='Addon Name:'
            id='name'
            placeholder='Addon Name'
            onChange={(e) => setName(e.target.value)}
            value={localName}
          />
        </div>
        <div className='pb-3 pr-3 pl-3'>
          <CurrencyField
            id='cost'
            label='Service cost:'
            onChange={(e) => setCost(e.value)}
            value={localCost}
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

AddonModal.propTypes = {
  show: bool.isRequired,
  title: string.isRequired,
  onClose: func.isRequired,
  onDelete: func.isRequired,
  onSave: func.isRequired,
  id: string,
  editMode: bool,
  name: string,
  cost: number,
};

AddonModal.defaultProps = {
  id: 'NaA',
  name: '',
  cost: 0.0,
  editMode: false,
};

export default AddonModal;
