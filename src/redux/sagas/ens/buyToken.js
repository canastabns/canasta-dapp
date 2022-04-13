import * as R from 'ramda';
import {put} from 'redux-saga/effects';
import * as ensConstants from 'redux/constants/ens';
import {setupENS} from 'utils/ens';
import Web3Utils from 'web3-utils';

function* buyToken({payload}) {
  try {
    const amount = R.pathOr(null, ['amount'], payload),
      amountInWei = Web3Utils.toWei(`${amount}`, 'ether'),
      {firstGovernanceTokenSale} = yield setupENS();

    yield firstGovernanceTokenSale.buyToken(amountInWei);

    yield put({
      type: ensConstants.BUY_TOKEN_SUCCESS
    });
  } catch (error) {
    console.log('buyToken error: ', error);
    yield put({
      type: ensConstants.BUY_TOKEN_FAILURE,
      payload: error?.message
    });
  }
}

export default buyToken;
