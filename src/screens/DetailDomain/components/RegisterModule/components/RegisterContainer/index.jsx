import React from 'react';

import BaseButton from 'components/BaseButton';
import BaseSelectNumber from 'components/BaseSelectNumber';
import PropTypes from 'prop-types';
import {Spinner} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {Translate} from 'react-redux-i18n';
import * as ensSelectors from 'redux/selectors/ensSelector';
import StepsComponent from 'screens/DetailDomain/components/StepsComponent';

import styles from './styles.module.scss';

const RegisterContainer = (props) => {
  const commit = useSelector(state => ensSelectors.getCommit(state));
  return (
    <>
      <div className={styles.subBody}>
        <div className={styles.selectQuantity}>

          <div className={styles.selectTime}>
            <BaseSelectNumber
              value={`${props.timeSelected} year${props.timeSelected > 1 ? 's' : ' '} `}
              lessTimeHandler={props.lessTimeHandler}
              addTimeHandler={props.addTimeHandler}
            />

            <div className={styles.legendTimeContainer}>
              <div className={styles.legendTime}>
                <Translate value={'detailPage.registerModule.legendTimeContainer'} />
              </div>
            </div>
          </div>

          <div className={styles.middleIconContainer} />

          <div className={styles.amountInCrypto}>
            <div className={styles.amountRowOne}>
              {props.rentPricesBegin && (
                <div className={styles.amountUsd}>
                  <Spinner animation="border" size="sm"/>
                </div>
              )}

              {props.rentPricesSuccess && (
                <div className={styles.priceRow}>
                  <div className={styles.amountUsd}>
                    {`${props.rentPrices.inBNB} BNB `}
                  </div>
                  -
                  <div className={styles.amountUsd}>{`$${props.rentPrices.inUSD} USD `}</div>
                </div>
              )}
            </div>
            {/*
            <div className={styles.amountRowSecond}>
              <div className={styles.legendAmount}>Periodo de Registracion</div>
            </div>
            */}
          </div>

        </div>

        <div className={`${styles.totalEstimated}`}>
          <div className={styles.amountRowOne}>
            ${props.rentPrices.inBNB} BNB
            + at least ${props.rentPrices.gasEstimateInBNB} BNB gas fee
            = at least ${Number(props.rentPrices.totalInBNB).toFixed(3)} {'BNB '} ${props.rentPrices.totalInUSD} USD
          </div>

          <div className={styles.amountRowSecond}>
            <div className={styles.legendAmount}>
              <Translate value={'detailPage.registerModule.estimateTotalGas'} />
            </div>
          </div>
        </div>

        <div>
          <div>
            <Translate value={'detailPage.registerModule.has3StepRequired'} />
          </div>
          <div className={styles.legendFav}>
            <Translate value={'detailPage.registerModule.selectDomainAsFavourite'} />
          </div>
        </div>
      </div>

      <StepsComponent steps={props.arrayStep} />

      <div className='d-flex justify-content-end'>
        <BaseButton
          className={styles.buttonRequestDomain}
          onClick={props.sendCommit}
          disabled={props.wallet.readOnly}
          text={'detailPage.registerModule.requestRegistration'}
          isLoading = {!commit.success && commit.begin}
        />
      </div>
    </>
  );
};

RegisterContainer.propTypes = {
  lessTimeHandler: PropTypes.func,
  addTimeHandler: PropTypes.func,
  sendCommit: PropTypes.func,
  timeSelected: PropTypes.number,
  rentPrices: PropTypes.object,
  wallet: PropTypes.object,
  arrayStep: PropTypes.array,
  rentPricesSuccess: PropTypes.bool,
  rentPricesBegin: PropTypes.bool
};

RegisterContainer.defaultProps = {
  lessTimeHandler: () => {},
  addTimeHandler: () => {},
  sendCommit: () => {},
  timeSelected: 1,
  rentPrices: {},
  wallet: {},
  arrayStep: [],
  rentPricesSuccess: false,
  rentPricesBegin: false
};

export default RegisterContainer;
