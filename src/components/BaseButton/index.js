import React from 'react';

import { Spin } from 'antd';
import PropTypes from 'prop-types';
import {Translate} from 'react-redux-i18n';

import styles from './style.module.scss';

const BaseButton = props => (
  <div
    
    className={`${styles.button} ${props.className} ${props.disabled && styles.buttonDisabled} ${props.isCompleted && styles.activeMe} `}
    onClick={props.disabled || props.isLoading ? () => {} : props.onClick}
  >
    {props.isLoading ? 
      (<Spin />)
      : (<Translate value={props.text} />)
    }
  
  </div>
);

BaseButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  isCompleted: PropTypes.bool
};

BaseButton.defaultProps = {
  onClick: () => {},
  disabled: false,
  text: 'Default text',
  className: '',
  isLoading: false,
  isCompleted: false
};

export default BaseButton;
