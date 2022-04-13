import BaseLayout from 'layouts/BaseLayout';

import Header from './components/Header';
import Logo from './components/Logo';
import styles from './main.module.scss';

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
      </div>
    </BaseLayout>
  );
}

export default MainLayout;
