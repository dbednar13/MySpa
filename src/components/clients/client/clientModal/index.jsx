import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { bool, func, shape } from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

import ClientData from '../clientData';
import { clientPropType, clientDefaultProps } from '../clientPropType';

const ClientModal = ({
  client,
  show,
  onClose,
  onDelete,
  onSave,
  editMode,
  errors,
  resetForm,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const hasErrors = errors.client && errors.client.name !== '';

  const handleClose = () => {
    resetForm();
    setShowAlert(false);
    onClose();
  };

  const handleDelete = () => {
    onDelete(client.id);
    onClose();
  };

  const handleSave = () => {
    setShowAlert(false);
    if (hasErrors) {
      setShowAlert(true);
    } else {
      onSave();
      onClose();
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
            <Button
              variant='primary'
              onClick={handleSave}
              // disabled={errorFields.length > 0}>
              disabled={hasErrors}>
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
  resetForm: func.isRequired,
  client: clientPropType,
  editMode: bool,
  errors: shape({}),
};

ClientModal.defaultProps = {
  client: clientDefaultProps,
  editMode: false,
  errors: undefined,
};

export default ClientModal;
