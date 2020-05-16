import React, { useState } from 'react';
import { func } from 'prop-types';

import { clientPropType } from './clientPropType';
import ClientData from './clientData';
import ClientModal from './clientModal';
import EditableCard from '../../editableCard';

const Client = ({ client, onSave, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);

  const onClientSave = () => {
    onSave(client, false);
  };

  return (
    <>
      <ClientModal
        onClose={() => setOpenModal(false)}
        onDelete={() => onDelete(client.id)}
        onSave={onClientSave}
        show={openModal}
        client={client}
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
    </>
  );
};

Client.propTypes = {
  client: clientPropType.isRequired,
  onDelete: func.isRequired,
  onSave: func.isRequired,
};

export default Client;
