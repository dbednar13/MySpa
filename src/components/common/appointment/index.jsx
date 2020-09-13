import React from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import { Formik } from 'formik';

import {
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import {
  appointmentPropType,
  appointmentDefaultProps,
} from '../props/appointmentPropType';

import { clientPropType } from '../props/clientPropType';
import { servicePropType } from '../props/servicePropType';
import { addonPropType } from '../props/addonPropType';

import { saveAppointment } from '../../../api/appointments';

const Appointment = ({
  addonList,
  appointment,
  clientDisabled,
  clientList,
  disabled,
  onClose,
  serviceList,
  userId,
}) => {
  const handleClose = (resetForm) => {
    resetForm();
    onClose();
  };

  const handleSave = (values) => {
    const isNew = values.id === undefined ? true : values.id === '';
    saveAppointment(userId, values, isNew);
    onClose();
  };

  return (
    <Formik
      initialValues={{ appointment }}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize>
      {({ values, resetForm, errors }) => (
        <form>
          <InputLabel id='client-label'>Client</InputLabel>
          <Select
            labelId='client-label'
            id='appointment.clientId'
            value={appointment.clientId}
            disabled={disabled || clientDisabled}>
            {clientList.map((c) => (
              <MenuItem key={c.id} value={c.id} primaryText={c.name} />
            ))}
          </Select>
          <TextField
            id='appointment.date'
            label='Date'
            type='datetime-local'
            defaultValue='2020-05-24T10:30'
            disabled={disabled}
          />
          <InputLabel id='service-label'>Service</InputLabel>
          <Select
            labelId='client-label'
            id='appointment.serviceId'
            value={appointment.serviceId}
            disabled={disabled}>
            {serviceList.map((s) => (
              <MenuItem key={s.id} value={s.id} primaryText={s.name} />
            ))}
          </Select>
          {addonList && (
            <>
              <InputLabel id='addon-label'>Addon</InputLabel>
              <Select
                labelId='addon-label'
                id='appointment.addonId'
                value={appointment.addonId}
                disabled={disabled}>
                {addonList.map((a) => (
                  <MenuItem
                    key={a.id}
                    value={a.id}
                    primaryText={a.name}
                    secondaryText='cost of addon'
                  />
                ))}
              </Select>
            </>
          )}
          {!disabled && (
            <>
              <Divider variant='middle' />
              <div className='d-flex justify-content-between pb-2'>
                <div className='d-flex pr-2'>
                  <div className='pr-2'>
                    <Button
                      variant='secondary'
                      onClick={handleClose(resetForm)}>
                      Close
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant='primary'
                      onClick={handleSave(values)}
                      disabled={errors && errors.date !== ''}>
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </form>
      )}
    </Formik>
  );
};

Appointment.propTypes = {
  clientList: arrayOf(clientPropType).isRequired,
  userId: string.isRequired,
  addonList: arrayOf(addonPropType),
  appointment: appointmentPropType,
  clientDisabled: bool,
  disabled: bool,
  onClose: func,
  serviceList: arrayOf(servicePropType),
};

Appointment.defaultProps = {
  addonList: undefined,
  appointment: appointmentDefaultProps,
  clientDisabled: false,
  disabled: false,
  onClose: undefined,
  serviceList: undefined,
};

export default Appointment;
