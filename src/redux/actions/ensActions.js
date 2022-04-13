import * as constants from 'redux/constants/ens';

export const searchDomain = payload => ({
  type: constants.SEARCH_DOMAIN_BEGIN,
  payload
});


export const getRentPrices = payload => ({
  type: constants.GET_RENT_PRICES_BEGIN,
  payload
});

export const sendCommit = payload => ({
  type: constants.COMMIT_BEGIN,
  payload
});

export const register = payload => ({
  type: constants.REGISTER_BEGIN,
  payload
});

export const changeAddress = payload => ({
  type: constants.CHANGE_ADDRESS_BEGIN,
  payload
});

export const transferTo = payload => ({
  type: constants.TRANSFER_DOMAIN_BEGIN,
  payload
});

export const renew = payload => ({
  type: constants.RENEW_BEGIN,
  payload
});

export const getTokenSaleData = payload => ({
  type: constants.GET_TOKEN_SALE_DATA_BEGIN,
  payload
});

export const buyToken = payload => ({
  type: constants.BUY_TOKEN_BEGIN,
  payload
});

export const getTokenPrice = payload => ({
  type: constants.GET_TOKEN_PRICE_BEGIN,
  payload
});


export const getTokenForMoreTokensData = payload => ({
  type: constants.GET_TOKEN_FOR_MORE_TOKENS_DATA_BEGIN,
  payload
});

export const checkAllowanceTokenForMoreTokens = payload => ({
  type: constants.CHECK_ALLOWANCE_TOKEN_FOR_MORE_TOKENS_BEGIN,
  payload
});

export const approveTokenForMoreTokens = payload => ({
  type: constants.APPROVE_TOKEN_FOR_MORE_TOKENS_BEGIN,
  payload
});

export const createStakeTokenForMoreTokens = payload => ({
  type: constants.STAKE_TOKEN_FOR_MORE_TOKENS_BEGIN,
  payload
});
