import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { bool, func, shape } from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

import ServiceData from '../serviceData';
import {
  servicePropType,
  serviceDefaultProps,
} from '../../../../../common/props/servicePropType';

const ServiceModal = ({
  service,
  show,
  onClose,
  onDelete,
  onSave,
  editMode,
  errors,
  resetForm,
}) => {
  const hasErrors =
    errors.service &&
    ((errors.service.name && errors.service.name !== '') ||
      (errors.service.duration && errors.service.duration !== '') ||
      (errors.service.cost && errors.service.cost !== ''));

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleDelete = () => {
    onDelete(service.id);
    onClose();
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  const formattedTitle = `${editMode ? 'Edit ' : 'Create '}Service`;

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formattedTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ServiceData service={service} isModal />
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
            <Button variant='primary' onClick={handleSave} disabled={hasErrors}>
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
  onClose: func.isRequired,
  onDelete: func.isRequired,
  onSave: func.isRequired,
  resetForm: func.isRequired,
  service: servicePropType,
  editMode: bool,
  errors: shape({}),
};

ServiceModal.defaultProps = {
  service: serviceDefaultProps,
  editMode: false,
  errors: undefined,
};

export default ServiceModal;
