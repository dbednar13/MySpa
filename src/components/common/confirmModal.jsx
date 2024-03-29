import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { bool, func, string } from 'prop-types';

const ConfirmModal = ({
  title,
  bodyText,
  onClose,
  onOk,
  show,
  closeText,
  okText,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onOk();
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{bodyText}</p>
      </Modal.Body>
      <Modal.Footer />
      <div className='d-flex justify-content-between pb-3 pl-2 pr-2'>
        <div>
          <Button variant='secondary' onClick={handleClose}>
            {closeText}
          </Button>
        </div>
        <div>
          <Button variant='primary' onClick={handleSave}>
            {okText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  title: string.isRequired,
  bodyText: string.isRequired,
  onClose: func.isRequired,
  onOk: func.isRequired,
  show: bool.isRequired,
  closeText: string,
  okText: string,
};

ConfirmModal.defaultProps = {
  closeText: 'I do not accept',
  okText: 'I accept',
};

export default ConfirmModal;
