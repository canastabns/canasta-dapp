import * as R from 'ramda';
import {put} from 'redux-saga/effects';
import * as ensConstants from 'redux/constants/ens';
import {setupENS} from 'utils/ens';
import Web3Utils from 'web3-utils';

function* getTokenSaleData({payload}) {
  try {
    const accountAddress = R.pathOr(null, ['address'], payload),
      {
        firstGovernanceTokenSale
      } = yield setupENS();

    let accountBalance = 0,
      accountBalanceInEther = 0;

    const tokenCost = yield firstGovernanceTokenSale.getTokenSaleCost(),
      contractTokenBalance = yield firstGovernanceTokenSale.getTokenBalance(),
      tokenCostInBNB = Web3Utils.fromWei(tokenCost, 'ether'),
      contractTokenBalanceInEther = Web3Utils.fromWei(contractTokenBalance, 'ether');

    if(accountAddress) {
      accountBalance = yield firstGovernanceTokenSale.tokenBalanceOf(accountAddress);
      accountBalanceInEther = Web3Utils.fromWei(accountBalance, 'ether');
    }

    yield put({
      type: ensConstants.GET_TOKEN_SALE_DATA_SUCCESS,
      payload: {
        tokenCost,
        tokenCostInBNB,

        contractTokenBalance,
        contractTokenBalanceInEther,

        accountBalance,
        accountBalanceInEther
      }
    });
  } catch (error) {
    console.log('getTokenSaleData error: ', error);
    yield put({
      type: ensConstants.GET_TOKEN_SALE_DATA_FAILURE,
      payload: error?.message
    });
  }
}

export default getTokenSaleData;
