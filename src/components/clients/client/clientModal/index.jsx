import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { bool, func } from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

import ClientData from '../clientData';
import { clientPropType, clientDefaultProps } from '../clientPropType';

const ClientModal = ({ client, show, onClose, onDelete, onSave, editMode }) => {
  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => {
    setShowAlert(false);
    onClose();
  };

  const handleDelete = () => {
    onDelete(client.id);
    onClose();
  };

  const handleSave = () => {
    setShowAlert(false);
    if (
      true
      /*
      TODO:  validate.
      localName &&
      localName !== '' &&
      localEmail &&
      localEmail !== '' &&
      localDiscount !== null &&
      localDiscount >= 0.0 &&
      localPhoneNumber !== null &&
      localPhoneNumber > 0.0 */
    ) {
      onSave();
      onClose();
    } else {
      setShowAlert(true);
    }
  };

  const formattedTitle = `${editMode ? 'Edit ' : 'Create '}Client`;

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formattedTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && (
          <Alert variant='danger'>Please enter a all information</Alert>
        )}
        <ClientData client={client} isModal />
      </Modal.Body>
      <Modal.Footer />
      <div className='d-flex justify-content-between pb-2'>
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

ClientModal.propTypes = {
  show: bool.isRequired,
  onClose: func.isRequired,
  onDelete: func.isRequired,
  onSave: func.isRequired,
  client: clientPropType,
  editMode: bool,
};

ClientModal.defaultProps = {
  client: clientDefaultProps,
  editMode: false,
};

export default ClientModal;
