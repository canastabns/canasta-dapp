import {useDispatch, useSelector} from 'react-redux';
import {Translate} from 'react-redux-i18n';
import * as walletActions from 'redux/actions/walletActions';
import * as WalletSelects from 'redux/selectors/walletSelector';
import * as Web3Interface from 'utils/web3';

import styles from './baseConnect.module.scss';

const BaseConnect = () => {
  const dispatch = useDispatch(),
    providerConnect = () => dispatch(
      walletActions.walletConnect({withBrowserProvider: true})
    ),
    providerDisconnect = () => dispatch(
      walletActions.walletDisconnect()
    );

  const wallet = useSelector(state => WalletSelects.getWalletState(state));

  const isConnectWithBrowserProvider = Web3Interface.isConnectWithWebProvider(),
    text = (isConnectWithBrowserProvider || !wallet.readOnly)
      ? 'homeLayoutHeader.disconnect' : 'homeLayoutHeader.connect',
    onClick = isConnectWithBrowserProvider ? providerDisconnect : providerConnect;

  return (
    <div onClick={onClick} className={styles.connectButton}>
    
      <Translate value={text} />
  
    </div>
  );
};

export default BaseConnect;