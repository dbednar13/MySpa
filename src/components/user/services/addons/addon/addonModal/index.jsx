import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { bool, func, shape } from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

import AddonData from '../addonData';
import { addonPropType, addonDefaultProps } from '../addonPropType';

const AddonModal = ({
  addon,
  show,
  onClose,
  onDelete,
  onSave,
  editMode,
  errors,
  resetForm,
}) => {
  const hasErrors =
    errors.addon &&
    ((errors.addon.name && errors.addon.name !== '') ||
      (errors.addon.cost && errors.addon.cost !== ''));

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleDelete = () => {
    onDelete(addon.id);
    onClose();
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  const formattedTitle = `${editMode ? 'Edit ' : 'Create '}Service Addon`;

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formattedTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddonData addon={addon} isModal />
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

AddonModal.propTypes = {
  show: bool.isRequired,
  onClose: func.isRequired,
  onDelete: func.isRequired,
  onSave: func.isRequired,
  resetForm: func.isRequired,
  addon: addonPropType,
  editMode: bool,
  errors: shape({}),
};

AddonModal.defaultProps = {
  addon: addonDefaultProps,
  editMode: false,
  errors: undefined,
};

export default AddonModal;
