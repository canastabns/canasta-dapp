import * as R from 'ramda';
import {createSelector} from 'reselect';

const getState = state => R.pathOr({}, ['ens'], state);

export const getSearchDomain = createSelector(
  getState,
  state => state.searchDomain
);

export const getRentPrices = createSelector(
  getState,
  state => state.rentPrices
);

export const getCommit = createSelector(
  getState,
  state => state.commit
);

export const getRegisterData = createSelector(
  getState,
  state => state.registerData
);

export const changeAddress = createSelector(
  getState,
  state => state.changeAddress
);

export const transferTo = createSelector(
  getState,
  state => state.transferTo
);

export const renew = createSelector(
  getState,
  state => state.renew
);

export const tokenSaleData = createSelector(
  getState,
  state => state.tokenSaleData
);

export const buyToken = createSelector(
  getState,
  state => state.buyToken
);

export const tokenPrice = createSelector(
  getState,
  state => state.tokenPrice
);

export const tokenForMoreTokensData = createSelector(
  getState,
  state => state.tokenForMoreTokensData
);

export const allowanceTokenForMoreTokens = createSelector(
  getState,
  state => state.checkTokenForMoreTokens
);

export const approveTokenForMoreTokens = createSelector(
  getState,
  state => state.approveTokenForMoreTokens
);

export const crateStakeTokenForMoreTokens = createSelector(
  getState,
  state => state.createStakeTokenForMoreTokens
);