import * as R from 'ramda';
import {put, select} from 'redux-saga/effects';
import * as ensConstants from 'redux/constants/ens';
import * as ensSelectors from 'redux/selectors/ensSelector';
import {setupENS} from 'utils/ens';
import {NULL_ADDRESS, isEqualAddress} from 'utils/web3/addressHelpers';

const getApplicationState = () => select((state) => state);

function* changeAddress({payload: newAddress}) {
  try {
    const applicationState = yield getApplicationState(),
      domainDetails = ensSelectors.getSearchDomain(applicationState);

    const oldAddress = R.pathOr(NULL_ADDRESS, ['data', 'address'], domainDetails),
      domain = R.pathOr(null, ['data', 'domainLabel'], domainDetails);

    if(!isEqualAddress(oldAddress, newAddress)) {
      const {ens} = yield setupENS();
      yield ens.setAddress(domain, newAddress);
      const address = yield ens.getAddress(domain);

      yield put({
        type: ensConstants.CHANGE_ADDRESS_SUCCESS
      });

      yield put({
        type: ensConstants.SEARCH_DOMAIN_SUCCESS,
        payload: {
          ...domainDetails.data,
          address
        }
      });
    }
  } catch (error) {
    console.log('set address error: ', error);
    yield put({
      type: ensConstants.CHANGE_ADDRESS_FAILURE,
      payload: error?.message
    });
  }
}

export default changeAddress;
