import BaseFavouriteHeart from 'components/BaseFavouriteHeart';
import PropTypes from 'prop-types';
import {Translate} from 'react-redux-i18n';

import styles from './styles.module.scss';

const DomainBar = props => {
  const availableText = props.available ?
    'favouritesScreen.domainBar.available' : 'favouritesScreen.domainBar.notAvailable';

  return(
    <div className={styles.container}>
      <div className={styles.leftContainer} onClick={props.onClick}>
        {props.domain}
      </div>

      <div className={styles.middleContainer} onClick={props.onClick}>
        <Translate value={availableText} />
      </div>

      <div className={styles.rightContainer}>
        <BaseFavouriteHeart value={props.domain} />
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
