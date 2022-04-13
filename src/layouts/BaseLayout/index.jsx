import {ReactComponent as IconWarning} from 'assets/svg/icon-warning.svg';
import {useSelector} from 'react-redux';
import * as walletSelectors from 'redux/selectors/walletSelector';

import styles from './styles.module.scss';

function BaseLayout (props) {
  const wallet = useSelector(state => walletSelectors.getWalletState(state));

  return (
    <>
      {wallet.address && !wallet.isCorrectedNetwork ?
        (
          <div className={styles.container}>
            <div className={styles.iconContainer}>
              <IconWarning
                width={100}
                height={100}
              />
            </div>

            <div className={styles.title}>
              Unsupported network {wallet.networkId}
            </div>

            <div className={styles.subTitle}>
              Please change your dapp browser to Binance smart chain
            </div>
          </div>
        )
        : props.children}
    </>
  );
}

export default BaseLayout;
