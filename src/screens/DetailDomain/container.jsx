import {Fragment} from 'react';
import {Translate} from 'react-redux-i18n';

import SecondaryLayout from 'layouts/Secondary';
import LateralMenu from 'layouts/Secondary/components/LateralMenu';
import PropTypes from 'prop-types';
import {Spinner} from 'react-bootstrap';

import DomainName from './components/DomainName';
import styles from './details.module.scss';
import BaseFavouriteHeart from 'components/BaseFavouriteHeart';

const DetailDomainContainer = (props) => {
  return (
    <SecondaryLayout>
      {props.searchBegin && (
        <Spinner animation="border" role="status"/>
      )}

      {(!props.searchBegin && props.searchSuccess) && (
        <>
          <div className={`d-none d-lg-block col-lg-2 ${styles.menu}`}>
            <LateralMenu />
          </div>

          <div className={`col-md-12 col-lg-10 ${styles.bodyContent}`}>
            <div className={styles.bodyDetail}>

              <DomainName
                domainLabel={props.domainLabel}
                domain={props.domain}
              />

              

              <div className={styles.tabs}>
                <div className={styles.iconFav}>
                  <BaseFavouriteHeart
                    value={props.domainLabel}
                  />
                </div>
                {props.tabs.map((row, index) => (
                  <Fragment key={`tab-options-${index}`}>
                    {row.show && (
                      <div
                        data-tab={index}
                        onClick={() => row.onClick(index)}
                        className={`${index === 0 ? styles.borderLeft : styles.borderRight} ${styles.isButton} ${props.activeTab === index ? styles.isButtonActive : styles.isButtonInactive}`}
                      >
                        <Translate value={row.label} />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
            <div className={styles.switchModule}>
              {props.tabs.map((row, index) => (
                <Fragment key={`tab-${index}`}>
                  {(row.show && props.activeTab === index) && (<row.Component />)}
                </Fragment>
              ))}
            </div>
          </div>
        </>)}

      {/*
      {props.searchError && (<>{props.searchError}</>)}
      */}
    </SecondaryLayout>
  );
};

DetailDomainContainer.propTypes = {
  searchBegin: PropTypes.bool,
  searchSuccess: PropTypes.bool,
  searchError: PropTypes.string,
  domainLabel: PropTypes.string,
  domain: PropTypes.string,
  activeTab: PropTypes.number,
  tabs: PropTypes.array
};

DetailDomainContainer.defaultProps = {
  searchBegin: false,
  searchSuccess: false,
  searchError: '',
  domainLabel: '',
  domain: '',
  activeTab: 1,
  tabs: []
};

export default DetailDomainContainer;
