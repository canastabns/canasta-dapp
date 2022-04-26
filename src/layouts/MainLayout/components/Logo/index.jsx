import {ReactComponent as LogoSvg} from 'assets/svg/canasta-logo-yellow.svg';

import styles from './logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.logoBackground}>
      <LogoSvg className={styles.logoPrincipal} />
    </div>
  );
};

export default Logo;
