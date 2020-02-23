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
  const [user, setUser] = useState(null);
  const [addons, setAddons] = useState([]);
  const [services, setServices] = useState([]);
  const [showAddonModal, setShowAddonModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  useEffect(() => {
    setUser(firebase.auth().currentUser);
  }, [firebase]);

  useEffect(() => {
    if (user) {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('addons')
        .get()
        .then(snapshot => {
          const tempAddons = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            if (data.active)
              tempAddons.push({
                name: data.name,
                cost: data.cost,
                id: doc.id
              });
          });
          setAddons(tempAddons);
        });
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('services')
        .get()
        .then(snapshot => {
          const tempServices = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            if (data.active)
              tempServices.push({
                name: data.name,
                cost: data.cost,
                duration: data.duration,
                id: doc.id
              });
          });
          setServices(tempServices);
        });
    }
  }, [user]);

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
    if (isNew || id === -1) {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('addons')
        .add({ name, cost: Number(cost), active });
    } else {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('addons')
        .doc(id)
        .set({ name, cost: Number(cost), active });
    }
  };

  const onSaveServiceClick = (isNew, name, duration, cost, active, id = -1) => {
    if (isNew || id === -1) {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('services')
        .add({ name, duration: Number(duration), cost: Number(cost), active });
    } else {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('services')
        .doc(id)
        .set({ name, duration: Number(duration), cost: Number(cost), active });
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
                key={`Card-Service-${service.id}`}
                id={service.id}
                title={service.name}
                onDelete={onAddonClick}
                onEdit={onAddonClick}
                body={
                  <Service
                    id={service.id}
                    cost={service.cost}
                    length={service.duration}
                  />
                }
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
                key={`Card-Addon-${addon.id}`}
                id={addon.id}
                title={addon.name}
                onDelete={onAddonClick}
                onEdit={onAddonClick}
                body={<Addon id={addon.id} cost={addon.cost} />}
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
