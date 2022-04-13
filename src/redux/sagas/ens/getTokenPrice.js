import * as R from 'ramda';
import {put} from 'redux-saga/effects';
import * as ensConstants from 'redux/constants/ens';
import {setupENS} from 'utils/ens';
import Web3Utils from 'web3-utils';

function* getTokenPrice({payload}) {
  try {
    const amount = R.pathOr(null, ['amount'], payload),
      amountInWei = Web3Utils.toWei(`${amount}`, 'ether'),
      {firstGovernanceTokenSale} = yield setupENS();

    const tokenPrice = yield firstGovernanceTokenSale.getPrice(amountInWei),
      tokenPriceInEther = Web3Utils.fromWei(tokenPrice, 'ether');

    yield put({
      type: ensConstants.GET_TOKEN_PRICE_SUCCESS,
      payload: {
        amount,
        tokenPrice,
        tokenPriceInEther
      }
    });
  } catch (error) {
    console.log('getTokenPrice error: ', error);
    yield put({
      type: ensConstants.GET_TOKEN_PRICE_FAILURE,
      payload: error?.message
    });
  }
}

export default getTokenPrice;
