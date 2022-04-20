import BaseLayout from 'layouts/BaseLayout';

import Header from './components/Header';
import Logo from './components/Logo';
import styles from './main.module.scss';

import LogoCanasta from 'assets/images/logo-canasta-black.png';
import { Link } from 'react-router-dom';

function MainLayout (props) {
  return (
    <BaseLayout>
      <div className={styles.main}>
        <div className={styles.mainContainer}>
          <Header />
          <Logo />
          <div className={`${styles.content}`}>
            {props.children}
          </div>
        </div>

        <div className={styles.socials}>
          <div className={styles.socials__logo}>
            <img src={LogoCanasta} />
          </div>
          <div className={styles.socials__network}>
            <div><a href={'https://twitter.com/CanastaDomains'} target={'_blank'} rel="noreferrer" > Twitter </a> </div>
            <div><a href={'https://github.com/canastabns'} target={'_blank'} rel="noreferrer" >Github </a></div>
            <div><a href={'https://blog.canasta.domains/'} target={'_blank'} rel="noreferrer" >Medium </a></div>
          </div>

        </div>
        <div className={styles.main__footer}>© 2022 Canasta binance name service</div>

      </div>
    </BaseLayout>
  );
}

export default MainLayout;
