import {ReactComponent as LogoSvg} from 'assets/svg/logo-canasta.svg';

import styles from './logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.logoBackground}>
      <LogoSvg className={styles.logoPrincipal} />
    </div>
  );
};

export default Logo;
