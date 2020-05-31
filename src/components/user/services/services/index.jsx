import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { Button, CardColumns } from 'react-bootstrap';
import { Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';

import Service from './service';
import ServiceModal from './service/serviceModal';
import { serviceDefaultProps } from './service/servicePropType';
import {
  deleteService,
  fetchServices,
  saveService,
} from '../../../../api/services';

const Services = ({ user }) => {
  const [servicesLoading, setServicesLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [services, setServices] = useState([]);

  const getServices = () => {
    fetchServices(user.uid).then((snapshot) => {
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
      getServices();
    }
  }, [user]);

  const onNewServiceClick = () => {
    setShowNewModal(true);
  };

  const onDeleteServicesClick = (id) => {
    deleteService(user.uid, id).then(getServices);
  };

  const onSave = (service, isNew) => {
    saveService(
      user.uid,
      isNew,
      service.name,
      service.duration,
      service.cost,
      service.id
    ).then(getServices);
  };

  const defaultNewService = { service: serviceDefaultProps };

  return (
    <>
      <Formik
        initialValues={defaultNewService}
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize>
        {({ values, resetForm, errors }) => (
          <form>
            <ServiceModal
              onClose={() => setShowNewModal(false)}
              onDelete={() => onDeleteServicesClick()}
              onSave={() => onSave(values.service, true)}
              show={showNewModal}
              resetForm={resetForm}
              service={defaultNewService}
              errors={errors}
              editMode
            />
          </form>
        )}
      </Formik>
      {servicesLoading && <CircularProgress />}
      {!servicesLoading && (
        <CardColumns className='pb-3'>
          {services.length > 0 &&
            services.map((service) => {
              return (
                <Service
                  key={service.id}
                  id={service.id}
                  service={service}
                  onSave={onSave}
                  onDelete={onDeleteServicesClick}
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
