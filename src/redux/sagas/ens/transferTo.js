import * as R from 'ramda';
import {put, select} from 'redux-saga/effects';
import * as ensConstants from 'redux/constants/ens';
import * as ensSelectors from 'redux/selectors/ensSelector';
import {setupENS} from 'utils/ens';
import {NULL_ADDRESS, isEqualAddress} from 'utils/web3/addressHelpers';

const getApplicationState = () => select((state) => state);

function* transferTo({payload: newOwnerAddress}) {
  try {
    const applicationState = yield getApplicationState(),
      domainDetails = ensSelectors.getSearchDomain(applicationState);

    const oldOwnerOf = R.pathOr(NULL_ADDRESS, ['data', 'ownerOf'], domainDetails),
      domain = R.pathOr(null, ['data', 'domainLabel'], domainDetails);

    if(!isEqualAddress(oldOwnerOf, newOwnerAddress)) {
      const {registrar} = yield setupENS();
      yield registrar.transferOwner(domain, newOwnerAddress);

      yield put({
        type: ensConstants.TRANSFER_DOMAIN_SUCCESS
      });

      yield put({
        type: ensConstants.SEARCH_DOMAIN_SUCCESS,
        payload: {
          ...domainDetails.data,
          ownerOf: newOwnerAddress
        }
      });
    }
  } catch (error) {
    console.log('transfer to error: ', error);
    yield put({
      type: ensConstants.TRANSFER_DOMAIN_FAILURE,
      payload: error?.message
    });
  }
}

export default transferTo;
