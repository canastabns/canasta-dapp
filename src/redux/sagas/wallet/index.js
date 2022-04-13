import {all, takeEvery} from 'redux-saga/effects';
import * as walletConstants from 'redux/constants/wallet';

import browserProviderConnect from './browserProviderConnect';
import walletDisconnect from './walletDisconnect';


export default function* rootInitialSaga(dispatch) {
  yield all([
    takeEvery(walletConstants.CONNECT_WALLET_BEGIN, payload =>
      browserProviderConnect(payload, dispatch)),

    takeEvery(walletConstants.DISCONNECT_WALLET_BEGIN, walletDisconnect)
  ]);
}
