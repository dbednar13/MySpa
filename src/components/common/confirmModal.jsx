import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { func, string } from 'prop-types';

const ConfirmModal = ({
  title,
  bodyText,
  onClose,
  onOk,
  closeText,
  okText,
}) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleSave = () => {
    setShow(false);
    onOk();
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyText}</Modal.Body>
      <Modal.Footer />
      <div className='d-flex justify-content-between pb-2'>
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
  closeText: string,
  okText: string,
};

ConfirmModal.defaultProps = {
  closeText: 'I do not accept',
  okText: 'I accept',
};
