import React, { useState, useEffect } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { bool, func, string, number } from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider, InputAdornment, TextField } from '@material-ui/core';

import NumberField from '../../../common/numberField';
import PhoneField from '../../../common/phoneField';

const ClientModal = ({
  show,
  title,
  name,
  discount,
  emailAddress,
  phoneNumber,
  onClose,
  onDelete,
  onSave,
  notes,
  id,
  editMode,
}) => {
  const [localDiscount, setLocalDiscount] = useState(0);
  const [localEmail, setLocalEmail] = useState('');
  const [localName, setName] = useState('');
  const [localPhoneNumber, setLocalPhoneNumber] = useState('');
  const [localNotes, setLocalNotes] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (editMode) {
      setName(name);
    }
  }, [name]);

  useEffect(() => {
    if (editMode) {
      setLocalEmail(emailAddress);
    }
  }, [emailAddress]);

  useEffect(() => {
    if (notes) {
      setLocalNotes(notes);
    }
  }, [notes]);

  useEffect(() => {
    if (editMode) {
      setLocalDiscount(discount);
    }
  }, [discount]);

  useEffect(() => {
    if (editMode) {
      setLocalPhoneNumber(phoneNumber);
    }
  }, [phoneNumber]);

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
      localEmail &&
      localEmail !== '' &&
      localDiscount !== null &&
      localDiscount >= 0.0 &&
      localPhoneNumber !== null &&
      localPhoneNumber > 0.0
    ) {
      onSave(
        !editMode,
        localName,
        localDiscount,
        localEmail,
        localPhoneNumber,
        localNotes,
        true,
        id
      );
      onClose();
    } else {
      setShowAlert(true);
    }
  };

  const setEmail = (value) => {
    setLocalEmail(value);
  };

  const formattedTitle = (editMode ? 'Edit ' : 'Create ') + title;

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formattedTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && (
          <Alert variant='danger'>Please enter a all information</Alert>
        )}
        <div className='pb-3 pr-3 pl-3'>
          <TextField
            label='Client Name:'
            id={`name-${id}`}
            placeholder='Service Name'
            onChange={(e) => setName(e.target.value)}
            value={localName}
          />
        </div>
        <div className='pb-3 pr-3 pl-3'>
          <TextField
            label='Email Address:'
            id={`emailAddress-${id}`}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={localEmail}
            fullWidth
          />
        </div>
        <div className='pb-3 pr-3 pl-3'>
          <PhoneField
            id={`phoneNumber-${id}`}
            label='Phone Number:'
            onChange={(e) => setLocalPhoneNumber(e.value)}
            value={localPhoneNumber}
          />
        </div>
        <div className='pb-3 pr-3 pl-3'>
          <NumberField
            id={`discount-${id}`}
            label='Service Discount:'
            decimalScale='0'
            allowNegative={false}
            value={discount}
            adornment={{
              endAdornment: <InputAdornment position='end'>%</InputAdornment>,
            }}
          />
        </div>
        <Divider variant='middle' />
        <div className='pb-3 pr-3 pl-3'>
          <TextField
            id={`clientNotes-${id}`}
            label='Client Notes'
            placeholder='Notes'
            fullWidth
            multiline
            rows={4}
            value={localNotes}
          />
        </div>
      </Modal.Body>
      <Modal.Footer />
      <div className='justify-content-between pb-3'>
        <div>
          {editMode && (
            <Button variant='link' onClick={handleDelete}>
              <DeleteIcon /> Delete
            </Button>
          )}
        </div>
        <div className='pr-2'>
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

ClientModal.propTypes = {
  show: bool.isRequired,
  title: string.isRequired,
  onClose: func.isRequired,
  onDelete: func.isRequired,
  onSave: func.isRequired,
  editMode: bool,
  id: string,
  name: string,
  discount: number,
  emailAddress: string,
  phoneNumber: string,
  notes: string,
};

ClientModal.defaultProps = {
  name: '',
  id: 'NaC',
  phoneNumber: '',
  emailAddress: '',
  notes: '',
  discount: 0,
  editMode: false,
};

export default ClientModal;
