import styles from './styles.module.scss';

import BaseButton from 'components/BaseButton';
import {Spin} from 'antd';

function start_and_end(str) {
  if (str.length > 40) {
    return str.substr(0, 14) + '...' + str.substr(str.length-10, str.length);
  }
  return str;
}

const CNSTAddress = process.env.REACT_APP_CNST;
const URLBlockchainScan = process.env.REACT_APP_URL_SCAN;
const STAKEForMoreTokensAddress = process.env.REACT_APP_STAKE_FOR_MORE_TOKENS;

const ContainerStakingToken = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.container__title}> Stake token </div>
        <div className={styles.container__body}>
          <div className={styles.inputToken}>
            <input
              className="baseInput"
              type='number'
              min={1}
              defaultValue={props.amount}
              onChange={props.amountInputHandler}
            />
          </div>

          <div className={styles.buttonContainer}>
            {props.walletConnected && props.isAllowance && (
              <BaseButton
                onClick={props.createStakeHandler}
                className={styles.buttonBuy}
                text={'Stake'}
                isLoading={props.createStakeIsLoading}
              />
            )}

            {props.walletConnected && !props.isAllowance && (
              <BaseButton
                onClick={props.approveHandler}
                className={styles.buttonBuy}
                text={'Approve'}
                isLoading={props.approveIsLoading}
              />
            )}

            {!props.walletConnected && (
              <BaseButton
                onClick={props.walletConnectHandler}
                className={styles.buttonBuy}
                text={'Connect'}
              />
            )}
          </div>
         
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={`${styles.container__title} ${styles.title__right}`}> Stake $CNST for more $CNST </div>

        {props.isLoading ? (
          <Spin />
        ) : (
          <>
            <div className={styles.container__body_right}>
              <div className={styles.container__item}>
                <div className={styles.titleContainer}>
                $CNST Contract:
                </div>
                <div className={styles.valueContainer}>
                  <a
                    href={`${URLBlockchainScan}/address/${CNSTAddress}`}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    {start_and_end(CNSTAddress)}
                  </a>
                </div>
              </div>

              <div className={styles.container__item}>
                <div className={styles.titleContainer}>
                Stake Contract:
                </div>

                <div className={styles.valueContainer}>
                  <a
                    href={`${URLBlockchainScan}/address/${STAKEForMoreTokensAddress}`}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    {start_and_end(STAKEForMoreTokensAddress)}
                  </a>
                </div>
              </div>

              <div className={styles.container__item}>
                <div className={styles.titleContainer}>
                $CNST staked:
                </div>

                <div className={styles.valueContainer}>
                  {props.data.amountStaked}
                </div>
              </div>

              <div className={styles.container__item}>
                <div className={styles.titleContainer}>
                $CNST rewards:
                </div>

                <div className={styles.valueContainer}>
                  {props.data.stakeReward}
                </div>
              </div>

              <div className={styles.container__item}>
                <div className={styles.titleContainer}>
                Your address:
                </div>

                <div className={styles.valueContainer}>
                  <a
                    href={`${URLBlockchainScan}/address/${props.walletAddress}`}
                    target={'_blank'} rel="noreferrer"
                  >
                    {start_and_end(props.walletAddress)}
                  </a>
                </div>
              </div>

              <div className={styles.container__item}>
                <div className={styles.titleContainer}>
                $CNST Balance:
                </div>

                <div className={styles.valueContainer}>
                  {props.data.accountBalance}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

ContainerStakingToken.propTypes = {};

export default ContainerStakingToken;
