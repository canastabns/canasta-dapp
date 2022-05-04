import * as R from 'ramda';

import buyTokenReducer from './buyToken';
import changeAddressReducer from './changeAddress';
import commitReducer from './commit';
import getFullRentPriceReducer from './getFullRentPrice';
import getTokenPriceReducer from './getTokenPrice';
import getTokenSaleDataReducer from './getTokenSaleData';
import registerReducer from './register';
import renewReducer from './renew';
import searchDomainReducer from './searchDomain';
import transferToReducer from './transferDomainTo';

import {
  getTokenForMoreTokensDataReducer,
  checkAllowanceTokenForMoreTokensReducer,
  approveTokenForMoreTokensReducer,
  stakeTokenForMoreTokensReducer,
  removeTokenForMoreTokensReducer
} from './tokenForMoreTokens';

export const initialState = {
  searchDomain: {
    begin: false,
    error: null,
    success: false,
    data: {
      available: false,
      domain: null,
      domainLabel: null
    }
  },
  rentPrices: {
    begin: false,
    error: null,
    success: false,
    data: {
      inWei: 0,
      inGwei: 0,
      inBNB: 0,
      inUSD: 0,

      gasEstimateInWei: 0,
      gasEstimateInGwei: 0,
      gasEstimateInBNB: 0,
      gasEstimateInUSD: 0,

      totalInWei: 0,
      totalInGwei: 0,
      totalInBNB: 0,
      totalInUSD: 0
    }
  },
  commit: {
    begin: false,
    requestStart: false,
    error: null,
    success: false,
    data: {
      txtHash: null
    }
  },
  registerData: {
    begin: false,
    error: null,
    success: false,
    data: null
  },
  changeAddress: {
    begin: false,
    error: null,
    success: false
  },
  transferTo: {
    begin: false,
    error: null,
    success: false
  },
  renew: {
    begin: false,
    error: null,
    success: false
  },
  tokenSaleData: {
    begin: false,
    error: null,
    success: false,
    data: {}
  },
  buyToken: {
    begin: false,
    error: null,
    success: false,
    data: {}
  },
  tokenPrice: {
    begin: false,
    error: null,
    success: false,
    data: {}
  },

  tokenForMoreTokensData: {
    begin: false,
    error: null,
    success: false,
    data: {}
  },
  checkTokenForMoreTokens: {
    begin: false,
    error: null,
    success: false,
    data: {}
  },
  approveTokenForMoreTokens: {
    begin: false,
    error: null,
    success: false,
    data: {}
  },
  createStakeTokenForMoreTokens: {
    begin: false,
    error: null,
    success: false,
    data: {}
  },
  removeStakeTokenForMoreTokens: {
    begin: false,
    error: null,
    success: false,
    data: {}
  }
};

export default function reducer(state = initialState, action = {}) {
  const payload = R.pathOr({}, ['payload'], action);
  const mapping = {
    ...searchDomainReducer(state, payload, 'searchDomain'),
    ...getFullRentPriceReducer(state, payload, 'rentPrices'),
    ...commitReducer(state, payload, 'commit'),
    ...registerReducer(state, payload, 'registerData'),
    ...changeAddressReducer(state, payload, 'changeAddress'),
    ...transferToReducer(state, payload, 'transferTo'),
    ...renewReducer(state, payload, 'renew'),
    ...getTokenSaleDataReducer(state, payload, 'tokenSaleData'),
    ...buyTokenReducer(state, payload, 'buyToken'),
    ...getTokenPriceReducer(state, payload, 'tokenPrice'),

    ...getTokenForMoreTokensDataReducer(state, payload, 'tokenForMoreTokensData'),
    ...checkAllowanceTokenForMoreTokensReducer(state, payload, 'checkTokenForMoreTokens'),
    ...approveTokenForMoreTokensReducer(state, payload, 'approveTokenForMoreTokens'),
    ...stakeTokenForMoreTokensReducer(state, payload, 'createStakeTokenForMoreTokens'),
    ...removeTokenForMoreTokensReducer(state, payload, 'removeStakeTokenForMoreTokens')
  };

  return mapping[action.type] || state;
}
