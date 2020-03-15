import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { shape } from 'prop-types';
import { Button, CardColumns } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditableCard from '../editableCard';
import { fireStore } from '../../firebase';
import Client from './client';

const Clients = ({ firebase }) => {
  const [clients, setClients] = useState(null);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [showClientModal, setShowClientModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(firebase.auth().currentUser);
  }, [firebase]);

  const fetchClients = () => {
    fireStore
      .collection('users')
      .doc(user.uid)
      .collection('clients')
      .get()
      .then(snapshot => {
        const tempClients = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.active)
            tempClients.push({
              name: data.name,
              id: doc.id
            });
        });
        setClients(tempClients);
        setClientsLoading(false);
      });
  };

  const onDeleteClientClick = id => {
    fireStore
      .collection('users')
      .doc(user.uid)
      .collection('clients')
      .doc(id)
      .update({ active: false })
      .then(fetchClients);
  };

  const onClientClick = () => {
    setShowClientModal(true);
  };
  const onClientClose = () => {
    setShowClientModal(false);
  };

  useEffect(() => {
    if (user) {
      fetchClients();
    }
  }, [user]);

  return !firebase.auth().currentUser ? (
    <Redirect to='/Home' />
  ) : (
    <>
      {clientsLoading && <CircularProgress />}
      {!clientsLoading && (
        <CardColumns className='pb-3'>
          {clients.length > 0 &&
            clients.map(client => {
              return (
                <EditableCard
                  key={`Card-Client-${client.id}`}
                  id={client.id}
                  title={client.name}
                  onDelete={() => onDeleteClientClick(client.id)}
                  onEdit={onClientClick}
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
      <Button onClick={onClientClick}>Add New Client</Button>
    </>
  );
};

Clients.propTypes = {
  firebase: shape({}).isRequired
};

export default Clients;
