import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { Button, CardColumns } from 'react-bootstrap';
import { Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';

import Addon from './addon';
import AddonModal from './addon/addonModal';
import { addonDefaultProps } from './addon/addonPropType';
import { fireStore } from '../../../../firebase';
import { deleteAddon, saveAddon } from '../../../../api/addons';

const Addons = ({ user }) => {
  const [addonsLoading, setAddonsLoading] = useState(true);
  const [addons, setAddons] = useState([]);
  const [showAddonModal, setShowAddonModal] = useState(false);

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
      setAddonsLoading(false);
    });
  };

  useEffect(() => {
    if (user) {
      getAddons();
    }
  }, [user]);

  const onNewAddonClick = () => {
    setShowAddonModal(true);
  };

  const onDeleteAddonClick = (id) => {
    deleteAddon(user.uid, id);
  };

  const onSaveAddonClick = (addon, isNew) => {
    saveAddon(user.uid, isNew, addon.name, addon.cost, addon.id);
  };

  const defaultNewAddon = { addon: addonDefaultProps };

  return (
    <>
      <Formik
        initialValues={defaultNewAddon}
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize>
        {({ values, resetForm, errors }) => (
          <form>
            <AddonModal
              onClose={() => setShowAddonModal(false)}
              onDelete={() => onDeleteAddonClick()}
              onSave={() => onSaveAddonClick(values.addon, true)}
              show={showAddonModal}
              resetForm={resetForm}
              addon={defaultNewAddon}
              errors={errors}
              editMode
            />
          </form>
        )}
      </Formik>
      {addonsLoading && <CircularProgress />}
      {!addonsLoading && (
        <CardColumns className='pb-3'>
          {addons.length > 0 &&
            addons.map((addon) => {
              return (
                <Addon
                  key={addon.id}
                  id={addon.id}
                  addon={addon}
                  onSave={onSaveAddonClick}
                  onDelete={onDeleteAddonClick}
                />
              );
            })}
        </CardColumns>
      )}
      <div className='pb-3'>
        <Button onClick={onNewAddonClick}>Add New Service Addon</Button>
      </div>
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
