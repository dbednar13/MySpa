import React from 'react';
import { shape, string, func } from 'prop-types';

const SideBar = () => {
  return <>Hello</>;
};

SideBar.propTypes = {
  linkList: shape([{ key: string.isRequired, text: string.isRequired }]),
  onClick: func.isRequired()
};
