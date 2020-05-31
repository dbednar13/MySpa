import {shape, number, string} from "prop-types";

  const servicePropType = shape({
    id: string,
    name: string,
    duration: number,
    cost: number,
  });

  const serviceDefaultProps = {
    name: '',
    id: '',
    duration: 0,
    cost: 0.0,
  }
  
  export {servicePropType, serviceDefaultProps};