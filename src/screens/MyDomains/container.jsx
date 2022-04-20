import SecondaryLayout from 'layouts/Secondary';
import LateralMenu from 'layouts/Secondary/components/LateralMenu';
import {Translate} from 'react-redux-i18n';

import DomainBar from './components/DomainBar';
import styles from 'screens/MyDomains/styles.module.scss';

const Container = (props) => {
  const domains = props.domains && Array.isArray(props.domains) && props.domains || [];
  return (
    <SecondaryLayout>
      <>
        <div className={`d-none d-md-block col-lg-2 ${styles.menu}`}>
          <LateralMenu />
        </div>
        <div className={`col-md-12 col-lg-10 ${styles.bodyContent}`}>
          <div className={styles.bodyDetail}>
            <Translate value="myDomains.title" />
          </div>
          <div className={styles.switchModule}>
            <div className={styles.domainBarContainer}>
              {domains && domains.length > 0 && domains.map((row, index) => (
                <DomainBar
                  key={`row-domain-${index}`}
                  domain={row.name}
                  onClick={() => window.open(`/search/${row.name}`, '_blank') }
                />
              ))}

              {!domains.length && (
                <div className={styles.notFoundMessage}>
                  <Translate value="myDomains.notFoundText" className={styles.notFoundMessage} />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </SecondaryLayout>
  );
};

export default Container;
