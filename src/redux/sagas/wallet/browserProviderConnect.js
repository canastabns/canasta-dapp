import {put} from 'redux-saga/effects';
import * as walletActions from 'redux/actions/walletActions';
import * as walletConstants from 'redux/constants/wallet';
import * as web3Interface from 'utils/web3';

/**
 * @description Must have a dispatch function.
 * @param payload {Object}
 * @param dispatch {Function}
 */
function* browserProviderConnect({payload}, dispatch) {
  try {
    let address;

    const withBrowserProvider = payload?.withBrowserProvider;

    const {web3Modal, web3, provider} = yield web3Interface.getWeb3({
        withBrowserProvider
      }),
      networkId = yield web3Interface.getNetworkId(web3),
      isCorrectedNetwork = yield web3Interface.isCorrectedNetwork(web3);

    if(web3Modal) {
      const disconnect = () => dispatch(walletActions.walletDisconnect({
        web3,
        web3Modal
      }));

      const subscribeProvider = provider => {
        if (!provider.on) {
          return;
        }
        provider.on('disconnect', () => {
          console.log('on close: ');
          disconnect();
        });

        provider.on('accountsChanged', async accounts => {
          if (accounts[0]) {
            console.log('on accountsChanged: ', accounts[0]);
            dispatch(walletActions.walletAccountChanged(accounts[0]));
          } else {
            console.log('on else accountsChanged: ');
            disconnect();
          }
        });

        provider.on('chainChanged', async chainId => {
          console.log('on chainChanged: ');
          const networkId = web3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId,
            isCorrectedNetwork = await web3Interface.isCorrectedNetwork(web3);

          dispatch(walletActions.walletNetworkChanged({
            networkId,
            isCorrectedNetwork
          }));
        });
      };

      subscribeProvider(provider);

      const accounts = yield web3Interface.getAccounts();

      address = accounts[0];
    }

    yield put({
      type: walletConstants.CONNECT_WALLET_SUCCESS,
      payload: {
        address,
        readOnly: !web3Modal,
        networkId,
        isCorrectedNetwork
      }
    });
  } catch (error) {
    yield put({
      type: walletConstants.CONNECT_WALLET_FAILURE,
      payload: {
        error: 'ooops'
      }
    });
  }
}

export default browserProviderConnect;
