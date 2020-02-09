import React, { useState } from 'react';
import { shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Service from './service';
import ServiceModal from './serviceModal';

const Services = ({ firebase }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const onAddClick = () => {
    setShowAddModal(true);
  };
  const onModalClose = () => {
    setShowAddModal(false);
  };

  const onSaveClick = service => {
    // TODO save new or update existing service
  };
  return !firebase.auth().currentUser ? (
    <Redirect to='/Home' />
  ) : (
    <>
      <Service />
      {showAddModal && (
        <ServiceModal
          title='Add New Service'
          onClose={onModalClose}
          onSave={onSaveClick}
        />
      )}
      <Button onClick={onAddClick}>Add New Service</Button>
    </>
  );
};

Services.propTypes = {
  firebase: shape({}).isRequired
};

export default Services;
