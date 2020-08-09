import React, { useState } from 'react';
import { func } from 'prop-types';
import { Formik } from 'formik';

import { addonPropType } from '../../../../common/props/addonPropType';
import AddonData from './addonData';
import AddonModal from './addonModal';
import EditableCard from '../../../../editableCard';

const Service = ({ addon, onSave, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);

  const onAddonSave = (values) => {
    onSave(values.addon, false);
  };

  return (
    <Formik
      initialValues={{ addon }}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize>
      {({ values, resetForm, errors }) => (
        <form>
          <AddonModal
            onClose={() => setOpenModal(false)}
            onDelete={() => onDelete(addon.id)}
            onSave={() => onAddonSave(values)}
            show={openModal}
            addon={addon}
            resetForm={resetForm}
            errors={errors}
            editMode
          />
          <EditableCard
            key={`Card-Addon-${addon.id}`}
            id={addon.id}
            title={addon.name}
            onDelete={() => onDelete(addon.id)}
            onEdit={() => setOpenModal(true)}
            body={<AddonData addon={addon} />}
          />
        </form>
      )}
    </Formik>
  );
};

Service.propTypes = {
  addon: addonPropType.isRequired,
  onDelete: func.isRequired,
  onSave: func.isRequired,
};

export default Service;
