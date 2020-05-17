import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { shape } from 'prop-types';
import { Button, CardColumns } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';

import Client from './client';
import { deleteClient, fetchClients, saveClient } from '../../api/clients';

const Clients = ({ firebase }) => {
  const [clients, setClients] = useState(null);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [showClientModal, setShowClientModal] = useState(false);
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

  const onNewClientClick = () => {
    const newState = { ...showClientModal, show: true };
    setShowClientModal(newState);
  };

  const onSave = (client, isNew) => {
    saveClient(
      user.uid,
      isNew,
      client.name,
      client.discount,
      client.emailAddress,
      client.phoneNumber,
      client.notes || '',
      client.id
    ).then(getClients);
  };

  return !firebase.auth().currentUser ? (
    <Redirect to='/Home' />
  ) : (
    <>
      {clientsLoading && <CircularProgress />}
      {!clientsLoading && (
        <CardColumns className='pb-3'>
          {clients.length > 0 &&
            clients.map((client) => {
              return (
                <Client
                  key={client.id}
                  id={client.id}
                  client={client}
                  onSave={onSave}
                  onDelete={onDeleteClientClick}
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
