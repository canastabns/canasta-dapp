import BaseButton from 'components/BaseButton';
import BaseChangeLanguage from 'components/BaseChangeLanguage';
import BaseConnect from 'components/BaseConnect';
import BaseLink from 'components/BaseLink';
import {Translate} from 'react-redux-i18n';

import styles from './header.module.scss';

function Header() {
  return (
    <header className={`${styles.headerContainer}`}>
      <div className={styles.headerLeftContainer}>
        <div className={styles.connectTextContainer}>
          {/*
          <BaseLink styles={styles.linkeado}>Main Red</BaseLink>
          <BaseLink styles={styles.linkeado}>(<Translate value="homeLayoutHeader.readOnly" />)</BaseLink>
          */}
        </div>

        <div className={styles.connectButtonContainer}>
          {/*
          <BaseConnect />
          */}
        </div>
      </div>

      <div className={styles.headerRightContainer}>
        <div className={styles.connectTextContainer}>
          {/*
          <BaseLink styles={styles.linkeado}>
            <Translate value="homeLayoutHeader.favourites" />
          </BaseLink>
          <BaseLink styles={styles.linkeado}>
            <Translate value="homeLayoutHeader.about" />
          </BaseLink>
          */}
        </div>
        <div className={styles.connectButtonContainer}>
          <BaseButton
            text={'global.buyToken'}
            className={styles.primaryButton}
            onClick={() => window.location.href = 'https://app.canasta.domains/tokens' }
          />
            
          <BaseChangeLanguage />
        </div>
      </div>
    </header>
  );
}

export default Header;
