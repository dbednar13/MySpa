import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { shape } from 'prop-types';
import { Button, CardColumns } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';

import EditableCard from '../editableCard';
import Client from './client';
import ClientModal from './client/modal';
import { deleteClient, fetchClients, saveClient } from '../../api/clients';

const Clients = ({ firebase }) => {
  const defaultModalState = {
    show: false,
    id: null,
    name: null,
    email: null,
    phoneNumber: null,
    discount: null,
    notes: '',
    edit: false,
  };

  const [clients, setClients] = useState(null);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [showClientModal, setShowClientModal] = useState(defaultModalState);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(firebase.auth().currentUser);
  }, [firebase]);

  const getClients = () => {
    fetchClients(user.uid).then((snapshot) => {
      const tempClients = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.active)
          tempClients.push({
            name: data.name,
            id: doc.id,
            emailAddress: data.emailAddress,
            phoneNumber: data.phoneNumber,
            discount: data.discount,
            notes: data.notes,
          });
      });
      setClients(tempClients);
      setClientsLoading(false);
    });
  };

  useEffect(() => {
    if (user) {
      getClients();
    }
  }, [user]);

  const onDeleteClientClick = (id) => {
    deleteClient(user.uid, id).then(getClients);
  };

  const onClientClick = (id, name, email, phoneNumber, discount, notes) => {
    setShowClientModal({
      show: true,
      id,
      name,
      email,
      phoneNumber,
      discount,
      notes,
      edit: true,
    });
  };

  const onClientClose = () => {
    const newState = defaultModalState;
    newState.show = false;
    setShowClientModal(newState);
  };

  const onNewClientClick = () => {
    const newState = { ...showClientModal, show: true };
    setShowClientModal(newState);
  };

  const onSaveClientClick = (
    isNew,
    name,
    discount,
    emailAddress,
    phoneNumber,
    notes,
    active,
    id = -1
  ) => {
    saveClient(
      user.uid,
      isNew,
      name,
      discount,
      emailAddress,
      phoneNumber,
      notes,
      active,
      id
    ).then(getClients);
  };

  return !firebase.auth().currentUser ? (
    <Redirect to='/Home' />
  ) : (
    <>
      {clientsLoading && <CircularProgress />}
      <ClientModal
        title='Client'
        onClose={onClientClose}
        onDelete={onDeleteClientClick}
        onSave={onSaveClientClick}
        show={showClientModal.show}
        id={showClientModal.id}
        name={showClientModal.name}
        phoneNumber={showClientModal.phoneNumber}
        emailAddress={showClientModal.email}
        discount={showClientModal.discount}
        editMode={showClientModal.edit}
        notes={showClientModal.notes}
      />
      {!clientsLoading && (
        <CardColumns className='pb-3'>
          {clients.length > 0 &&
            clients.map((client) => {
              return (
                <EditableCard
                  key={`Card-Client-${client.id}`}
                  id={client.id}
                  title={client.name}
                  onDelete={() => onDeleteClientClick(client.id)}
                  onEdit={() =>
                    onClientClick(
                      client.id,
                      client.name,
                      client.emailAddress,
                      client.phoneNumber,
                      client.discount,
                      client.notes
                    )
                  }
                  body={
                    <Client
                      id={client.id}
                      emailAddress={client.emailAddress}
                      phoneNumber={client.phoneNumber}
                      discount={client.discount}
                    />
                  }
                />
              );
            })}
        </CardColumns>
      )}
      <Button onClick={onNewClientClick}>Add New Client</Button>
    </>
  );
};

Clients.propTypes = {
  firebase: shape({}).isRequired,
};

export default Clients;
