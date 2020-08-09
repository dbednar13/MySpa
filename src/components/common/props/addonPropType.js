import {shape, number, string} from "prop-types";

  const addonPropType = shape({
    id: string,
    name: string,
    cost: number,
  });

  const addonDefaultProps = {
    name: '',
    id: '',
    cost: 0.0,
  }
  
  export {addonPropType, addonDefaultProps};