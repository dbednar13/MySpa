import React, { useState } from 'react';
import { shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AddonModal from './addonsModal';
import Service from './service';
import ServiceModal from './serviceModal';

const Services = ({ firebase }) => {
  const [showAddonModal, setShowAddonModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const onAddonClick = () => {
    setShowAddonModal(true);
  };
  const onAddonClose = () => {
    setShowAddonModal(false);
  };

  const onServiceClick = () => {
    setShowServiceModal(true);
  };
  const onServiceClose = () => {
    setShowServiceModal(false);
  };

  const onSaveAddonClick = () => {
    // TODO save new or update existing service
  };

  const onSaveServiceClick = () => {
    // TODO save new or update existing service
  };
  return !firebase.auth().currentUser ? (
    <Redirect to='/Home' />
  ) : (
    <>
      <AddonModal
        title='Add New Service Addon'
        onClose={onAddonClose}
        onSave={onSaveAddonClick}
        show={showAddonModal}
      />
      <Service />
      <ServiceModal
        title='Add New Service'
        onClose={onServiceClose}
        onSave={onSaveServiceClick}
        show={showServiceModal}
      />
      <Button onClick={onServiceClick}>Add New Service</Button>
      <Button onClick={onAddonClick}>Add New Service Addon</Button>
    </>
  );
};

Services.propTypes = {
  firebase: shape({}).isRequired
};

export default Services;
