import React, { useState } from 'react';
import { func } from 'prop-types';
import { Formik } from 'formik';

import { servicePropType } from '../../../../common/props/servicePropType';
import ServiceData from './serviceData';
import ServiceModal from './serviceModal';
import EditableCard from '../../../../editableCard';

const Service = ({ service, onSave, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);

  const onServiceSave = (values) => {
    onSave(values.service, false);
  };

  return (
    <Formik
      initialValues={{ service }}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize>
      {({ values, resetForm, errors }) => (
        <form>
          <ServiceModal
            onClose={() => setOpenModal(false)}
            onDelete={() => onDelete(service.id)}
            onSave={() => onServiceSave(values)}
            show={openModal}
            service={service}
            resetForm={resetForm}
            errors={errors}
            editMode
          />
          <EditableCard
            key={`Card-Service-${service.id}`}
            id={service.id}
            title={service.name}
            onDelete={() => onDelete(service.id)}
            onEdit={() => setOpenModal(true)}
            body={<ServiceData service={service} />}
          />
        </form>
      )}
    </Formik>
  );
};

Service.propTypes = {
  service: servicePropType.isRequired,
  onDelete: func.isRequired,
  onSave: func.isRequired,
};

export default Service;
