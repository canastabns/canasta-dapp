import { ReactComponent as IconArrowRight } from 'assets/svg/icon-arrow-right.svg';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const DomainBar = props => {

  return(
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.leftContainer}>
        {props.domain}
      </div>

      <div className={styles.rightContainer}>
        <IconArrowRight width={30} />
      </div>
    </div>
  );
};

DomainBar.propTypes = {
  domain: PropTypes.string,
  available: PropTypes.bool,
  onClick: PropTypes.func
};

DomainBar.defaultProps = {
  domain: '',
  available: true,
  onClick: () => {}
};

export default DomainBar;
