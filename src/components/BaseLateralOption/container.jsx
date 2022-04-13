import PropTypes from 'prop-types';
import {Translate} from 'react-redux-i18n';

import styles from './styles.module.scss';

const BaseLateralOption = (props) => {
  return (
    <div
      className={styles.menuOptionContainer}
      onClick={props.onClick}
    >
      <div className={styles.menuIconContainer}>
        {props.Icon}
      </div>

      <div className={styles.menuTextContainer}>
        <Translate value={props.text} />
      </div>
    </div>
  );
};

BaseLateralOption.propTypes = {
  onClick: PropTypes.func,
  Icon: PropTypes.object,
  text: PropTypes.string
};

BaseLateralOption.defaultProps = {
  onClick: () => {},
  Icon: {},
  text: ''
};

export default BaseLateralOption;
