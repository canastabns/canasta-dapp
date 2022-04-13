import { Spin } from 'antd';
import BaseButton from 'components/BaseButton';

import styles from './buyToken.module.scss';

function start_and_end(str) {
  if (str.length > 40) {
    return str.substr(0, 14) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

const BuyToken = (props) => {

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.container__title}> Buy canasta token </div>
        <div className={styles.container__body}>
          <div className={styles.inputToken}>
            <input
              type='number'
              min={1}
              defaultValue={props.amount}
              onChange={props.amountInputHandler}
            />
          </div>
          <div
            className={styles.buttonContainer}
          >
            {!props.walletConnected ? (
              <BaseButton
                onClick={props.walletConnectHandler}
                className={styles.buttonBuy}
                text={'Connect'}
              />
            ) : (
              <>
                <BaseButton
                  disabled={props.isBuyLoading}
                  isLoading={props.tokenPriceIsLoading}
                  onClick={props.getTokenPrice}
                  className={styles.buttonBuy}
                  text={'Get Price'}
                />

                <BaseButton
                  isLoading={props.isBuyLoading}
                  disabled={!props.tokenPriceInEther}
                  onClick={props.buyToken}
                  className={styles.buttonBuy}
                  text={'Buy'}
                />
              </>
            )}
          </div>

          <div className={styles.pricePreviewContainer}>
            {props.tokenPriceInEther && `${props.tokenAmount} $CNST = ${props.tokenPriceInEther} BNB`}
          </div>
        </div>
      </div>
       
      <div className={styles.rightContainer}>
        <div className={`${styles.container__title} ${styles.title__right}`}> Buy canasta token </div>

        {props.isLoadingData ? (
          <Spin />
        ) : (
          <div className={styles.container__body_right}>
            <div className={styles.container__item}>
              <div className={styles.titleContainer}>Contract token: </div>
              <div className={styles.valueContainer}>
                <a
                  href={`${process.env.REACT_APP_URL_SCAN}/address/0xFf4bCfCe9FD8375D7449b98579745Fc92C73DD2B`}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  {start_and_end('0xFf4bCfCe9FD8375D7449b98579745Fc92C73DD2B')}
                </a>
              </div>
            </div>

            <div className={styles.container__item}>
              <div className={styles.titleContainer}>Contract sale token: </div>
              <div className={styles.valueContainer}>
                <a
                  href={`${process.env.REACT_APP_URL_SCAN}/address/0x04D61971D63DA0E113440b0278CD05494256F39e`}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  {start_and_end('0x04D61971D63DA0E113440b0278CD05494256F39e')}
                </a>
              </div>
            </div>

            <div className={styles.container__item}>
              <div className={styles.titleContainer}>Token price: </div>
              <div className={styles.valueContainer}>{props.tokenCostInBNB} BNB</div>
            </div>

            <div className={styles.container__item}>
              <div className={styles.titleContainer}>Available token sale: </div>
              <div className={styles.valueContainer}>{props.contractTokenBalanceInEther}</div>
            </div>

            <div className={styles.container__item}>
              <div className={styles.titleContainer}>Your address: </div>
              <div className={styles.valueContainer}>
                <a
                  href={`${process.env.REACT_APP_URL_SCAN}/address/${props.walletAddress}`}
                  target={'_blank'} rel="noreferrer"
                >
                  {start_and_end(props.walletAddress)}
                </a>
              </div>
            </div>

            <div className={styles.container__item}>
              <div className={styles.titleContainer}>Your $CNST balance: </div>
              <div className={styles.valueContainer}>{props.accountBalanceInEther}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

BuyToken.propTypes = {

};

export default BuyToken;

