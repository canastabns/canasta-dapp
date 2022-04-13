import SecondaryLayout from 'layouts/Secondary';
import LateralMenu from 'layouts/Secondary/components/LateralMenu';
import {Translate} from 'react-redux-i18n';

import DomainBar from './components/DomainBar';
import styles from './details.module.scss';

const FavouritesContainer = (props) => {
  const favourites = props.favourites && Array.isArray(props.favourites) && props.favourites || [];
  return (
    <SecondaryLayout>
      <>
        <div className={`d-none d-md-block col-lg-2 ${styles.menu}`}>
          <LateralMenu />
        </div>
        <div className={`col-md-12 col-lg-10 ${styles.bodyContent}`}>
          <div className={styles.bodyDetail}>
            <Translate value="favouritesScreen.title" />
          </div>
          <div className={styles.switchModule}>
            <div className={styles.domainBarContainer}>
              {favourites.map((row, index) => {
                if(row && row.domain)
                  return (
                    <DomainBar
                      key={`domain-bar-${index}`}
                      domain={row.domain}
                      onClick={() => window.location.href = `/search/${row.domain}` }
                    />
                  );

                return null;
              })}
            </div>
          </div>
        </div>
      </>
    </SecondaryLayout>
  );
};

export default FavouritesContainer;
