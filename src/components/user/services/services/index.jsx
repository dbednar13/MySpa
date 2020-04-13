import React, { useState, useEffect } from 'react';
import { Button, CardColumns } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';

import { shape } from 'prop-types';
import Service from './service';
import ServiceModal from './serviceModal';
import EditableCard from '../../../editableCard';
import { fireStore } from '../../../../firebase';

const Services = ({ user }) => {
  const defaultServiceState = {
    show: false,
    id: null,
    name: null,
    duration: null,
    cost: null,
    edit: false,
  };

  const [servicesLoading, setServicesLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [serviceModalState, setServiceModalState] = useState(
    defaultServiceState
  );

  const fetchServices = () => {
    fireStore
      .collection('users')
      .doc(user.uid)
      .collection('services')
      .get()
      .then((snapshot) => {
        const tempServices = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.active)
            tempServices.push({
              name: data.name,
              cost: data.cost,
              duration: data.duration,
              id: doc.id,
            });
        });
        setServices(tempServices);
        setServicesLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      fetchServices();
    }
  }, [user]);

  const onNewServiceClick = () => {
    const newState = { ...serviceModalState, show: true };
    setServiceModalState(newState);
  };
  const onEditServiceClick = (service) => {
    const newState = {
      show: true,
      id: service.id,
      name: service.name,
      duration: service.duration,
      cost: service.cost,
      edit: true,
    };
    setServiceModalState(newState);
  };
  const onServiceClose = () => {
    setServiceModalState(defaultServiceState);
  };

  const onDeleteServicesClick = (id) => {
    fireStore
      .collection('users')
      .doc(user.uid)
      .collection('services')
      .doc(id)
      .update({ active: false })
      .then(fetchServices);
  };

  const onSaveServiceClick = (isNew, name, duration, cost, active, id = -1) => {
    if (isNew || id === -1) {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('services')
        .add({ name, duration: Number(duration), cost: Number(cost), active })
        .then(fetchServices);
    } else {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('services')
        .doc(id)
        .set(
          { name, duration: Number(duration), cost: Number(cost), active },
          { merge: true }
        )
        .then(fetchServices);
    }
  };

  return (
    <>
      <ServiceModal
        title={`${serviceModalState.edit ? 'Edit' : 'Add New'} Service`}
        onClose={onServiceClose}
        onDelete={onDeleteServicesClick}
        onSave={onSaveServiceClick}
        show={serviceModalState.show}
        id={serviceModalState.id}
        name={serviceModalState.name}
        cost={serviceModalState.cost}
        duration={serviceModalState.duration}
        editMode={serviceModalState.edit}
      />
      {servicesLoading && <CircularProgress />}
      {!servicesLoading && (
        <CardColumns className='pb-3'>
          {services.length > 0 &&
            services.map((service) => {
              return (
                <EditableCard
                  key={`Card-Service-${service.id}`}
                  id={service.id}
                  title={service.name}
                  onDelete={() => onDeleteServicesClick(service.id)}
                  onEdit={() => onEditServiceClick(service)}
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
      )}
      <Button onClick={onNewServiceClick}>Add New Service</Button>
    </>
  );
};

Services.propTypes = {
  user: shape({}),
};
Services.defaultProps = {
  user: undefined,
};

export default Services;
