import { shape, string } from 'prop-types';

const appointmentPropType = shape({
  id: string,
  addonId: string,
  clientId: string,
  date: string,
  serviceId: string,
});

const appointmentDefaultProps = {
  id: '',
  addonId: '',
  clientId: '',
  date: '',
  serviceId: '',
};

export { appointmentPropType, appointmentDefaultProps };
