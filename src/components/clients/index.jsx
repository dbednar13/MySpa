import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { shape } from 'prop-types';
import { Button, CardColumns } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditableCard from '../editableCard';
import { fireStore } from '../../firebase';
import Client from './client';
import ClientModal from './client/modal';

const Clients = ({ firebase }) => {
  const defaultModalState = {
    show: false,
    id: null,
    name: null,
    email: null,
    phoneNumber: null,
    discount: null,
    edit: false
  };

  const [clients, setClients] = useState(null);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [showClientModal, setShowClientModal] = useState(defaultModalState);
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
              id: doc.id,
              emailAddress: data.emailAddress,
              phoneNumber: data.phoneNumber,
              discount: data.discount
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

  const onNewClientClick = () => {
    const newState = { ...showClientModal, show: true };
    setShowClientModal(newState);
  };

  const onClientClick = (id, name, email, phoneNumber, discount) => {
    setShowClientModal({
      show: true,
      id,
      name,
      email,
      phoneNumber,
      discount,
      edit: true
    });
  };
  const onClientClose = () => {
    const newState = defaultModalState;
    newState.show = false;
    setShowClientModal(newState);
  };

  const onSaveClientClick = (
    isNew,
    name,
    discount,
    emailAddress,
    phoneNumber,
    active,
    id = -1
  ) => {
    if (isNew || id === 'NaC') {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('clients')
        .add({
          name,
          phoneNumber: Number(phoneNumber),
          emailAddress,
          discount: Number(discount),
          active
        })
        .then(fetchClients);
    } else {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('clients')
        .doc(id)
        .set(
          {
            name,
            phoneNumber: Number(phoneNumber),
            emailAddress,
            discount: Number(discount),
            active
          },
          { merge: true }
        )
        .then(fetchClients);
    }
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
      <ClientModal
        title='Client'
        onClose={onClientClose}
        onSave={onSaveClientClick}
        show={showClientModal.show}
      />
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
                  onEdit={() =>
                    onClientClick(
                      client.id,
                      client.name,
                      client.emailAddress,
                      client.phoneNumber,
                      client.discount
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
  firebase: shape({}).isRequired
};

export default Clients;
