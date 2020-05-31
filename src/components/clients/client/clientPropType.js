import {shape, number, string} from "prop-types";

const clientPropType = shape({
  id: string,
  name: string,
  phoneNumber: string,
  emailAddress: string,
  discount: number,
  notes: string,
});

const clientDefaultProps = {
  id: '',
  name: '',
  phoneNumber: '',
  emailAddress: '',
  discount: 0,
  notes: '',
}

export {clientPropType, clientDefaultProps};