import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { bool, func, string, number } from 'prop-types';
import NumberFormat from 'react-number-format';
import DeleteIcon from '@material-ui/icons/Delete';

const AddonModal = ({ show, title, name, cost, onClose, onSave, editMode }) => {
  const [cost, setCost] = useState(null);
  const [name, setName] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setShowAlert(false);
    onClose();
  };

  const handleSave = () => {
    setShowAlert(false);
    if (name && name !== '' && cost !== null && cost > 0.0) {
      onSave(true, name, cost, true);
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
        <div className='d-flex pb-2'>
          <label htmlFor='name'>
            Service Name:{' '}
            <input
              id='name'
              type='text'
              placeholder='Serivce Name'
              onChange={e => setName(e.target.value)}
              value={name}
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
              value={cost}
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

AddonModal.propTypes = {
  show: bool.isRequired,
  title: string.isRequired,
  onClose: func.isRequired,
  onSave: func.isRequired,
  editMode: bool.isRequired,
  name: string,
  cost: number
};

AddonModal.defaultProps = {
  name: '',
  cost: 0.0
};

export default AddonModal;
