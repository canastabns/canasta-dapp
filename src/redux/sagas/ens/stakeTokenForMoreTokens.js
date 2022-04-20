import * as R from 'ramda';
import {put} from 'redux-saga/effects';
import * as ensConstants from 'redux/constants/ens';
import {setupENS} from 'utils/ens';
import Web3Utils from 'web3-utils';

import {CONTRACTS_ADDRESSES} from 'utils/ens/address';

export function* getStakeTokenForMoreTokensData({payload}) {
  try {
    const accountAddress = R.pathOr(null, ['address'], payload),
      {
        stakeForMoreSameToken,
        cnstContract
      } = yield setupENS();

    let accountBalanceFormatted = 0,
      accountStakeAmountFormatted = 0,
      stakeRewardFormatted = 0;

    if(accountAddress) {
      const accountBalance = yield cnstContract.balanceOf(accountAddress);
      const amountStaked = yield stakeForMoreSameToken.stakeAmountOf(accountAddress);
      const stakeReward = yield stakeForMoreSameToken.rewardOf(accountAddress);

      accountBalanceFormatted = Web3Utils.fromWei(accountBalance, 'ether');
      accountStakeAmountFormatted = Web3Utils.fromWei(amountStaked, 'ether');
      stakeRewardFormatted = Web3Utils.fromWei(stakeReward, 'ether');
    }

    yield put({
      type: ensConstants.GET_TOKEN_FOR_MORE_TOKENS_DATA_SUCCESS,
      payload: {
        accountBalance: accountBalanceFormatted,
        amountStaked: accountStakeAmountFormatted,
        stakeReward: stakeRewardFormatted
      }
    });
  } catch (error) {
    console.log('getStakeTokenForMoreTokensData error: ', error);
    yield put({
      type: ensConstants.GET_TOKEN_FOR_MORE_TOKENS_DATA_FAILURE,
      payload: error?.message
    });
  }
}

export function* checkIfMaxAmountIsApprove({payload}) {
  try {
    const {
      cnstContract
    } = yield setupENS();

    const isAllowance = yield cnstContract.isAllowance(payload.address, CONTRACTS_ADDRESSES.StakeForMoreTokens);

    yield put({
      type: ensConstants.CHECK_ALLOWANCE_TOKEN_FOR_MORE_TOKENS_SUCCESS,
      payload: {
        isAllowance
      }
    });
  } catch (error) {
    console.log('checkIfMaxAmountIsApprove error: ', error);
    yield put({
      type: ensConstants.CHECK_ALLOWANCE_TOKEN_FOR_MORE_TOKENS_FAILURE,
      payload: error?.message
    });
  }
}

export function* approveForTokenForMoreToken({payload}) {
  try {
    const {
      cnstContract
    } = yield setupENS();

    yield cnstContract.approve(CONTRACTS_ADDRESSES.StakeForMoreTokens);
    const isAllowance = yield cnstContract.isAllowance(payload.address, CONTRACTS_ADDRESSES.StakeForMoreTokens);

    yield put({
      type: ensConstants.APPROVE_TOKEN_FOR_MORE_TOKENS_SUCCESS,
      payload: {}
    });

    yield put({
      type: ensConstants.CHECK_ALLOWANCE_TOKEN_FOR_MORE_TOKENS_SUCCESS,
      payload: {
        isAllowance
      }
    });
  } catch (error) {
    console.log('approve error: ', error);
    yield put({
      type: ensConstants.APPROVE_TOKEN_FOR_MORE_TOKENS_FAILURE,
      payload: error?.message
    });
  }
}

export function* createStakeForTokenForMoreToken({payload}) {
  try {
    const {
      stakeForMoreSameToken
    } = yield setupENS();

    yield stakeForMoreSameToken.createStake(payload.amount);

    yield put({
      type: ensConstants.STAKE_TOKEN_FOR_MORE_TOKENS_SUCCESS
    });
  } catch (error) {
    console.log('approve error: ', error);
    yield put({
      type: ensConstants.STAKE_TOKEN_FOR_MORE_TOKENS_FAILURE,
      payload: error?.message
    });
  }
}
