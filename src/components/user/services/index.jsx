import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, CardColumns } from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import AddonModal from './addonsModal';
import Service from './service';
import ServiceModal from './serviceModal';
import EditableCard from '../../editableCard';
import { fireStore } from '../../../firebase';

const Services = ({ firebase }) => {
  const [addons, setAddons] = useState([]);
  const [services, setServices] = useState([]);
  const [showAddonModal, setShowAddonModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const unsubscribeAddons = firebase.db
      .collection('myDbName')
      .doc(user.uid)
      .collection('addons')
      .onSnapshot(snapshot => {
        const tempAddons = [];
        if (snapshot.size) {
          snapshot.forEach(doc => {
            if (doc.active) {
              tempAddons.push({ title: doc.title, cost: doc.cost, id: doc.id });
            }
          });
          setAddons(tempAddons);
        }
      });
    const unsubscribeServices = firebase.db
      .collection('myDbName')
      .doc(user.uid)
      .collection('services')
      .onSnapshot(snapshot => {
        const tempServices = [];
        if (snapshot.size) {
          snapshot.forEach(doc => {
            if (doc.active) {
              tempServices.push({
                title: doc.title,
                time: doc.time,
                cost: doc.cost,
                id: doc.id
              });
            }
          });
          setServices(tempServices);
        }
      });
    return () => {
      unsubscribeAddons();
      unsubscribeServices();
    };
  }, [firebase]);

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

  const onSaveAddonClick = (isNew, name, cost, active, id = -1) => {
    const user = firebase.auth().currentUser;
    if (isNew || id === -1) {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('addons')
        .Add({ name, cost, active });
    } else {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('addons')
        .doc(id)
        .Set({ name, cost, active });
    }
  };

  const onSaveServiceClick = (isNew, name, duration, cost, active, id = -1) => {
    const user = firebase.auth().currentUser;
    if (isNew || id === -1) {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('services')
        .Add({ name, duration, cost, active });
    } else {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('services')
        .doc(id)
        .Set({ name, duration, cost, active });
    }
  };

  return !firebase.auth().currentUser ? (
    <Redirect to='/Home' />
  ) : (
    <>
      <ServiceModal
        title='Add New Service'
        onClose={onServiceClose}
        onSave={onSaveServiceClick}
        show={showServiceModal}
      />
      <AddonModal
        title='Add New Service Addon'
        onClose={onAddonClose}
        onSave={onSaveAddonClick}
        show={showAddonModal}
      />
      <div>
        <Service />
      </div>
      <CardColumns className='pb-3'>
        <EditableCard
          title='test1'
          onDelete={onAddonClick}
          onEdit={onAddonClick}
          body={<Service cost={0.0} length={60} />}
        />
      </CardColumns>
      <Button onClick={onServiceClick}>Add New Service</Button>
      <div className='pt-3 pb-3'>
        <Divider variant='middle' />
      </div>
      <Button onClick={onAddonClick}>Add New Service Addon</Button>
    </>
  );
};

Services.propTypes = {
  firebase: shape({}).isRequired
};

export default Services;
