import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { shape } from 'prop-types';

import { fireStore } from '../../firebase';
import Appointment from '../common/appointment';

const Dashboard = ({ firebase }) => {
  const [addons, setAddons] = useState([]);
  const [addonsLoaded, setAddonsLoaded] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoaded, setAppointmentsLoaded] = useState(false);
  const [clients, setClients] = useState(null);
  const [clientsLoaded, setClientsLoaded] = useState(false);
  const [services, setServices] = useState([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(firebase.auth().currentUser);
  }, [firebase]);

  const getAddons = () => {
    const collection = fireStore.collection(`users/${user.uid}/addons`);
    return collection.onSnapshot((snapshot) => {
      const tempAddons = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.active)
          tempAddons.push({
            name: data.name,
            cost: data.cost,
            id: doc.id,
          });
      });
      setAddons(tempAddons);
      setAddonsLoaded(true);
    });
  };

  const getAppointments = () => {
    const collection = fireStore.collection(`users/${user.uid}/appointments`);
    // TODO:  Return only future appointments.  Limit 5.
    return collection.onSnapshot((snapshot) => {
      const tempAppointments = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        tempAppointments.push(data);
      });
      setAppointments(tempAppointments);
      setAppointmentsLoaded(true);
    });
  };

  const loaded =
    addonsLoaded && appointmentsLoaded && clientsLoaded && servicesLoaded;

  const getClients = () => {
    const collection = fireStore.collection(`users/${user.uid}/clients`);
    return collection.onSnapshot((snapshot) => {
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
      setClientsLoaded(true);
    });
  };

  const getServices = () => {
    const collection = fireStore.collection(`users/${user.uid}/services`);
    return collection.onSnapshot((snapshot) => {
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
      setServicesLoaded(true);
    });
  };

  useEffect(() => {
    if (user) {
      getAddons();
      getClients();
      getServices();
      getAppointments();
    }
    return () => {};
  }, [user]);

  const handleCloseAppointment = () => {
    return setShowNewAppointment(false);
  };

  return (
    <>
      <>
        Placeholder for logged in user&apos;s dashboard. Things to show: -
        Average Charge - Average Tip - Link to cost settings - Link to add-on
        service maintenance - Account maintenance - Stripe settings -
        Subscription maintenance - Firebase Account Maintenance Future things to
        show: - Average length of booking - Upcoming appointments
      </>
      <div>
        <Button
          variant='primary'
          disabled={!loaded}
          onClick={setShowNewAppointment(!showNewAppointment)}>
          New Appointment
        </Button>
      </div>
      {loaded &&
        appointments.map((appointment) => {
          return (
            <Appointment
              appointment={appointment}
              onClose={handleCloseAppointment}
              clientList={clients}
              addonList={addons}
              serviceList={services}
            />
          );
        })}
    </>
  );
};

Dashboard.propTypes = {
  firebase: shape({}).isRequired,
};

export default Dashboard;
