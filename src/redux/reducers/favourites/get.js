import * as constants from 'redux/constants/favourites';

import {initialState} from './index';

export default function reducer(
  state = initialState,
  payload = {},
  reducerName = 'favouritesData'
) {
  return {
    [constants.GET_FAVOURITES_BEGIN]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: true,
        success: false
      }
    },
    [constants.GET_FAVOURITES_SUCCESS]: {
      ...state,
      [reducerName]: {
        ...state[reducerName],
        begin: false,
        success: true,
        data: payload
      }
    },
    [constants.GET_FAVOURITES_FAILURE]: {
      ...state,
      [reducerName]: {
        ...initialState[reducerName],
        error: payload
      }
    }
  };
}
