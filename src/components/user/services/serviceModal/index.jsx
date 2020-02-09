import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { func, string } from 'prop-types';
import Details from '../service/details';

const ServiceModal = ({ title, onClose, onSave }) => {
  const handleSave = data => {
    onSave(data);
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
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ServiceModal.propTypes = {
  title: string.isRequired,
  onClose: func.isRequired,
  onSave: func.isRequired,
};

export default ServiceModal;
