import {shape, number, string} from "prop-types";

const clientPropType = shape({
  id: string,
  phoneNumber: string,
  emailAddress: string,
  discount: number,
  clientNotes: string,
});

const clientDefaultProps = {
  id: '',
  phoneNumber: '',
  emailAddress: '',
  discount: 0,
  clientNotes: '',
}

export {clientPropType, clientDefaultProps};