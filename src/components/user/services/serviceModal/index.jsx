import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { bool, func, string } from 'prop-types';
import Details from '../service/details';

const ServiceModal = ({ title, isNew, onClose, onSave }) => {
  const handleSave = data => {
    onSave(data, isNew);
  };

  return (
    <>
      <Modal centered onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Details />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ServiceModal.propTypes = {
  title: string.isRequired,
  isNew: bool,
  onClose: func.isRequired,
  onSave: func.isRequired
};

ServiceModal.defaultProps = {
  isNew: false
};

export default ServiceModal;
