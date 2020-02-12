import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { bool, func, string, object } from 'prop-types';

const InternalModal = ({ body, onClose, onSave, show, title }) => {
  const handleSave = data => {
    onSave(data);
  };
  return (
    <Modal centered show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

InternalModal.propTypes = {
  // eslint-disable-next-line
  body: object.isRequired,
  onClose: func.isRequired,
  onSave: func.isRequired,
  show: bool.isRequired,
  title: string.isRequired
};

export default InternalModal;
