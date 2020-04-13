import React, { useState, useEffect } from 'react';
import { Button, CardColumns } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';

import { shape } from 'prop-types';
import Addon from './addon';
import AddonModal from './addonModal';
import EditableCard from '../../../editableCard';
import { fireStore } from '../../../../firebase';

const Addons = ({ user }) => {
  const defaultAddonState = {
    show: false,
    id: null,
    name: null,
    cost: null,
    edit: false,
  };

  const [addonsLoading, setAddonsLoading] = useState(true);
  const [addons, setAddons] = useState([]);
  const [addonModalState, setAddonModalState] = useState(defaultAddonState);

  const fetchAddons = () => {
    fireStore
      .collection('users')
      .doc(user.uid)
      .collection('addons')
      .get()
      .then((snapshot) => {
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
        setAddonsLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      fetchAddons();
    }
  }, [user]);

  const onNewAddonClick = () => {
    const newState = { ...addonModalState, show: true };
    setAddonModalState(newState);
  };
  const onEditAddonClick = (addon) => {
    const newState = {
      show: true,
      id: addon.id,
      name: addon.name,
      cost: addon.cost,
      edit: true,
    };
    setAddonModalState(newState);
  };
  const onAddonClose = () => {
    setAddonModalState(defaultAddonState);
  };

  const onDeleteAddonClick = (id) => {
    fireStore
      .collection('users')
      .doc(user.uid)
      .collection('addons')
      .doc(id)
      .update({ active: false })
      .then(fetchAddons);
  };

  const onSaveAddonClick = (isNew, name, cost, active, id = -1) => {
    if (isNew || id === -1) {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('addons')
        .add({ name, cost: Number(cost), active })
        .then(fetchAddons);
    } else {
      fireStore
        .collection('users')
        .doc(user.uid)
        .collection('addons')
        .doc(id)
        .set({ name, cost: Number(cost), active }, { merge: true })
        .then(fetchAddons);
    }
  };

  return (
    <>
      <AddonModal
        title={`${addonModalState.edit ? 'Edit' : 'Add New'} Service Addon`}
        onClose={onAddonClose}
        onDelete={onDeleteAddonClick}
        onSave={onSaveAddonClick}
        show={addonModalState.show}
        id={addonModalState.id}
        name={addonModalState.name}
        cost={addonModalState.cost}
        editMode={addonModalState.edit}
      />
      {addonsLoading && <CircularProgress />}
      {!addonsLoading && (
        <CardColumns className='pb-3'>
          {addons.length > 0 &&
            addons.map((addon) => {
              return (
                <EditableCard
                  key={`Card-Addon-${addon.id}`}
                  id={addon.id}
                  title={addon.name}
                  onDelete={() => onDeleteAddonClick(addon.id)}
                  onEdit={() => onEditAddonClick(addon)}
                  body={<Addon id={addon.id} cost={addon.cost} />}
                />
              );
            })}
        </CardColumns>
      )}
      <Button onClick={onNewAddonClick}>Add New Service Addon</Button>
    </>
  );
};

Addons.propTypes = {
  user: shape({}),
};
Addons.defaultProps = {
  user: undefined,
};

export default Addons;
