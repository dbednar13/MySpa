import React, { useState } from 'react';
import { func } from 'prop-types';
import { Formik } from 'formik';

import { clientPropType } from './clientPropType';
import ClientData from './clientData';
import ClientModal from './clientModal';
import EditableCard from '../../editableCard';

const Client = ({ client, onSave, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);

  const onClientSave = (values) => {
    onSave(values.client, false);
  };

  return (
    <Formik
      initialValues={{ client }}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize>
      {({ values, resetForm, errors }) => (
        <form>
          <ClientModal
            onClose={() => setOpenModal(false)}
            onDelete={() => onDelete(client.id)}
            onSave={() => onClientSave(values)}
            show={openModal}
            client={client}
            resetForm={resetForm}
            errors={errors}
            editMode
          />
          <EditableCard
            key={`Card-Client-${client.id}`}
            id={`card-${client.id}`}
            title={client.name}
            onDelete={() => onDelete(client.id)}
            onEdit={() => setOpenModal(true)}
            body={<ClientData client={client} />}
          />
        </form>
      )}
    </Formik>
  );
};

Client.propTypes = {
  client: clientPropType.isRequired,
  onDelete: func.isRequired,
  onSave: func.isRequired,
};

export default Client;
