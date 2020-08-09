import { shape, string } from 'prop-types';

const clientPropType = shape({
  id: string,
  name: string,
});

const clientDefaultProps = {
  id: '',
  name: '',
};

export { clientPropType, clientDefaultProps };
