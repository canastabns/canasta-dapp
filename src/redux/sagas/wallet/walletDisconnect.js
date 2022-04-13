import * as R from 'ramda';
import {call, put} from 'redux-saga/effects';
import * as walletConstants from 'redux/constants/wallet';
import * as web3Interface from 'utils/web3';

function* walletDisconnect() {
  try {
    const connectWithBrowserPlugin = web3Interface.isConnectWithWebProvider();

    if(!connectWithBrowserPlugin)
      return;

    const {web3Modal, web3} = yield web3Interface.getWeb3();

    if (R.pathOr(null, ['currentProvider', 'close'], web3))
      yield call(web3.currentProvider.close);

    if (R.pathOr(null, ['clearCachedProvider'], web3Modal))
      web3Interface.clearCachedProvider();

    yield put({
      type: walletConstants.DISCONNECT_WALLET_SUCCESS
    });
  } catch (error) {
    yield put({
      type: walletConstants.DISCONNECT_WALLET_FAILURE,
      payload: {
        error: 'ooops'
      }
    });
  }
}

export default walletDisconnect;
