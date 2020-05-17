import {shape, number, string} from "prop-types";

const clientPropType = shape({
  id: string,
  phoneNumber: string,
  emailAddress: string,
  discount: number,
  notes: string,
});

const clientDefaultProps = {
  id: '',
  phoneNumber: '',
  emailAddress: '',
  discount: 0,
  notes: '',
}

export {clientPropType, clientDefaultProps};