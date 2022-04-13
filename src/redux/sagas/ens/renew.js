import * as R from 'ramda';
import {put, select} from 'redux-saga/effects';
import * as ensConstants from 'redux/constants/ens';
import * as ensSelectors from 'redux/selectors/ensSelector';
import {setupENS} from 'utils/ens';

const getApplicationState = () => select((state) => state);

function* renew() {
  try {
    const applicationState = yield getApplicationState(),
      domainDetails = ensSelectors.getSearchDomain(applicationState),
      domain = R.pathOr(null, ['data', 'domain'], domainDetails), // domainLabel
      {registrar} = yield setupENS();

    yield registrar.renew(domain, 31536000);

    const domainData = yield registrar.getPermanentEntry(domain);

    yield put({
      type: ensConstants.RENEW_SUCCESS
    });

    yield put({
      type: ensConstants.SEARCH_DOMAIN_SUCCESS,
      payload: {
        ...domainDetails.data,
        nameExpires: domainData.nameExpires
      }
    });
  } catch (error) {
    console.log('renew error: ', error);
    yield put({
      type: ensConstants.RENEW_FAILURE,
      payload: error?.message
    });
  }
}

export default renew;
