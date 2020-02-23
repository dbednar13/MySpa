import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, CardColumns } from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import AddonModal from './addonsModal';
import Addon from './addon';
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
    const unsubscribeAddons = fireStore
      .collection('users')
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
    return () => {
      unsubscribeAddons();
    };
  }, [firebase]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const unsubscribeServices = fireStore
      .collection('users')
      .doc(user.uid)
      .collection('services')
      .onSnapshot(snapshot => {
        const tempServices = [];
        if (snapshot.size) {
          snapshot.docs.forEach(doc => {
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
        .add({ name, cost, active });
    } else {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('addons')
        .doc(id)
        .set({ name, cost, active });
    }
  };

  const onSaveServiceClick = (isNew, name, duration, cost, active, id = -1) => {
    const user = firebase.auth().currentUser;
    debugger;
    if (isNew || id === -1) {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('services')
        .add({ name, duration, cost, active });
    } else {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('services')
        .doc(id)
        .set({ name, duration, cost, active });
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
      <CardColumns className='pb-3'>
        {services.length > 0 &&
          services.map(service => {
            return (
              <EditableCard
                id={service.id}
                title={service.title}
                onDelete={onAddonClick}
                onEdit={onAddonClick}
                body={<Service cost={service.cost} length={service.length} />}
              />
            );
          })}
      </CardColumns>
      <Button onClick={onServiceClick}>Add New Service</Button>
      <div className='pt-3 pb-3'>
        <Divider variant='middle' />
      </div>
      <CardColumns className='pb-3'>
        {addons.length > 0 &&
          addons.map(addon => {
            return (
              <EditableCard
                id={addon.id}
                title={addon.title}
                onDelete={onAddonClick}
                onEdit={onAddonClick}
                body={<Addon cost={addon.cost} />}
              />
            );
          })}
      </CardColumns>
      <Button onClick={onAddonClick}>Add New Service Addon</Button>
    </>
  );
};

Services.propTypes = {
  firebase: shape({}).isRequired
};

export default Services;
