import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { bool, func, string, number } from 'prop-types';
import NumberFormat from 'react-number-format';
import DeleteIcon from '@material-ui/icons/Delete';

const ClientModal = ({
  show,
  title,
  name,
  discount,
  emailAddress,
  phoneNumber,
  onClose,
  onSave,
  id,
  editMode
}) => {
  const [localDiscount, setLocalDiscount] = useState(discount);
  const [localEmail, setLocalEmail] = useState(emailAddress);
  const [localName, setName] = useState(name);
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setShowAlert(false);
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
        true,
        id
      );
      onClose();
    } else {
      setShowAlert(true);
    }
  };

  const setEmail = value => {
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
        <div className='d-flex pb-2'>
          <label htmlFor={`name-${id}`}>
            Service Name:{' '}
            <input
              id={`name-${id}`}
              type='text'
              placeholder='Serivce Name'
              onChange={e => setName(e.target.value)}
              value={localName}
            />
          </label>
        </div>
        <div className='d-flex pb-2'>
          <label htmlFor={`emailAddress-${id}`}>
            Email Address:{' '}
            <input
              id={`emailAddress-${id}`}
              type='text'
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
              value={localEmail}
            />
          </label>
        </div>
        <div className='d-flex pb-2'>
          <label htmlFor={`phoneNumber-${id}`}>
            Phone Number:{' '}
            <NumberFormat
              id={`phoneNumber-${id}`}
              format='+1 (###) ###-####'
              allowEmptyFormatting
              mask='_'
              value={localPhoneNumber}
              onValueChange={e => setLocalPhoneNumber(e.value)}
            />
          </label>
        </div>
        <div className='d-flex pb-2'>
          <label htmlFor={`discount-${id}`}>
            Service Discount:{' '}
            <NumberFormat
              id={`discount-${id}`}
              decimalScale='0'
              allowNegative={false}
              suffix='%'
              value={localDiscount}
              onValueChange={e => setLocalDiscount(e.value)}
            />
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {editMode && (
          <div>
            <Button variant='link' onClick={handleClose}>
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

ClientModal.propTypes = {
  show: bool.isRequired,
  title: string.isRequired,
  onClose: func.isRequired,
  onSave: func.isRequired,
  editMode: bool,
  id: string,
  name: string,
  discount: number,
  emailAddress: string,
  phoneNumber: string
};

ClientModal.defaultProps = {
  name: '',
  id: 'NaC',
  phoneNumber: '',
  emailAddress: '',
  discount: 0,
  editMode: false
};

export default ClientModal;
