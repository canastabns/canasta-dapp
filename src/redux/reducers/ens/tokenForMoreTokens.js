import * as constants from 'redux/constants/ens';

import {initialState} from './index';

export function getTokenForMoreTokensDataReducer(
  state = initialState,
  payload = {},
  reducerName = 'tokenSaleData'
) {
  return {
    [constants.GET_TOKEN_FOR_MORE_TOKENS_DATA_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true
      }
    },
    [constants.GET_TOKEN_FOR_MORE_TOKENS_DATA_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true,
        data: payload
      }
    },
    [constants.GET_TOKEN_FOR_MORE_TOKENS_DATA_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

export function checkAllowanceTokenForMoreTokensReducer(
  state = initialState,
  payload = {},
  reducerName = 'checkTokenForMoreTokens'
) {
  return {
    [constants.CHECK_ALLOWANCE_TOKEN_FOR_MORE_TOKENS_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true
      }
    },
    [constants.CHECK_ALLOWANCE_TOKEN_FOR_MORE_TOKENS_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true,
        data: payload
      }
    },
    [constants.CHECK_ALLOWANCE_TOKEN_FOR_MORE_TOKENS_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

export function approveTokenForMoreTokensReducer(
  state = initialState,
  payload = {},
  reducerName = 'approveTokenForMoreTokens'
) {
  return {
    [constants.APPROVE_TOKEN_FOR_MORE_TOKENS_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true
      }
    },
    [constants.APPROVE_TOKEN_FOR_MORE_TOKENS_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true,
        data: payload
      }
    },
    [constants.APPROVE_TOKEN_FOR_MORE_TOKENS_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}

export function stakeTokenForMoreTokensReducer(
  state = initialState,
  payload = {},
  reducerName = 'createStakeTokenForMoreTokens'
) {
  return {
    [constants.STAKE_TOKEN_FOR_MORE_TOKENS_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true
      }
    },
    [constants.STAKE_TOKEN_FOR_MORE_TOKENS_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true,
        data: payload
      }
    },
    [constants.STAKE_TOKEN_FOR_MORE_TOKENS_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}