import {put} from 'redux-saga/effects';
import * as ensConstants from 'redux/constants/ens';
import {setupENS} from 'utils/ens';

function* getRentPrices({payload}) {
  try {
    const {registrar} = yield setupENS(),
      yearInSeconds = 31536000;

    const domain = payload.domain,
      duration = (payload.duration || 1) * yearInSeconds;

    const rentPrices = yield registrar.getFullRentPrice(domain, duration);

    yield put({
      type: ensConstants.GET_RENT_PRICES_SUCCESS,
      payload: rentPrices
    });
  } catch (error) {
    yield put({
      type: ensConstants.GET_RENT_PRICES_FAILURE,
      payload: error?.message
    });
  }
}

export default getRentPrices;
