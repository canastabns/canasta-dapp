import {all, takeEvery} from 'redux-saga/effects';
import * as walletConstants from 'redux/constants/ens';

import buyToken from './buyToken';
import changeAddress from './changeAddress';
import getRentPrices from './getRentPrices';
import getTokenPrice from './getTokenPrice';
import getTokenSaleData from './getTokenSaleData';
import register from './register';
import renew from './renew';
import searchDomain from './searchDomain';
import sendCommit from './sendCommit';
import transferTo from './transferTo';

import {
  getStakeTokenForMoreTokensData,
  checkIfMaxAmountIsApprove,
  approveForTokenForMoreToken,
  createStakeForTokenForMoreToken,
  removeStakeForTokenForMoreToken
} from './stakeTokenForMoreTokens';

export default function* rootInitialSaga() {
  yield all([
    takeEvery(walletConstants.SEARCH_DOMAIN_BEGIN, searchDomain),
    takeEvery(walletConstants.GET_RENT_PRICES_BEGIN, getRentPrices),
    takeEvery(walletConstants.COMMIT_BEGIN, sendCommit),
    takeEvery(walletConstants.REGISTER_BEGIN, register),
    takeEvery(walletConstants.CHANGE_ADDRESS_BEGIN, changeAddress),
    takeEvery(walletConstants.TRANSFER_DOMAIN_BEGIN, transferTo),
    takeEvery(walletConstants.RENEW_BEGIN, renew),
    takeEvery(walletConstants.GET_TOKEN_SALE_DATA_BEGIN, getTokenSaleData),
    takeEvery(walletConstants.GET_TOKEN_PRICE_BEGIN, getTokenPrice),
    takeEvery(walletConstants.BUY_TOKEN_BEGIN, buyToken),

    takeEvery(walletConstants.GET_TOKEN_FOR_MORE_TOKENS_DATA_BEGIN, getStakeTokenForMoreTokensData),
    takeEvery(walletConstants.CHECK_ALLOWANCE_TOKEN_FOR_MORE_TOKENS_BEGIN, checkIfMaxAmountIsApprove),
    takeEvery(walletConstants.APPROVE_TOKEN_FOR_MORE_TOKENS_BEGIN, approveForTokenForMoreToken),
    takeEvery(walletConstants.STAKE_TOKEN_FOR_MORE_TOKENS_BEGIN, createStakeForTokenForMoreToken),
    takeEvery(walletConstants.REMOVE_TOKEN_FOR_MORE_TOKENS_BEGIN, removeStakeForTokenForMoreToken)
  ]);
}
