import React from 'react';

import PropTypes from 'prop-types';

import BaseSelectNumberContainer from './container';

const BaseSelectNumber = (props) => (
  <BaseSelectNumberContainer {...props} />
);

BaseSelectNumber.propTypes = {
  lessTimeHandler: PropTypes.func,
  addTimeHandler: PropTypes.func,
  value: PropTypes.string
};

BaseSelectNumber.defaultProps = {
  lessTimeHandler: () => {},
  addTimeHandler: () => {},
  value: ''
};

export default BaseSelectNumber;
