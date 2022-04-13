import * as R from 'ramda';
import {put} from 'redux-saga/effects';
import * as ensConstants from 'redux/constants/ens';
import {setupENS} from 'utils/ens';
import {NULL_ADDRESS, isEqualAddress} from 'utils/web3/addressHelpers';

function* searchDomain({payload}) {
  try {
    const {
      domainName,
      connectedAddress
    } = payload;

    const domain = domainName && domainName.split('.')[0].toLowerCase(),
      fullDomain = `${domain}.${process.env.REACT_APP_DOMAIN_TLD}`;

    const {registrar, ens} = yield setupENS(),
      isValidName = yield registrar.checkValidName(domain);

    if(!isValidName)
      throw new Error('im sorry it\'s not valid name');

    const domainData = yield registrar.getPermanentEntry(domain),
      ownerAddress = R.pathOr(NULL_ADDRESS, ['ownerOf'], domainData),
      isOwner = isEqualAddress(connectedAddress, ownerAddress);

    const address = yield ens.getAddress(fullDomain);

    if(domainData.available) {
      yield put({
        type: ensConstants.GET_RENT_PRICES_BEGIN,
        payload: {domain: domain, duration: 1}
      });
    }

    yield put({
      type: ensConstants.SEARCH_DOMAIN_SUCCESS,
      payload: {
        ...domainData,
        domain: domain,
        address,
        domainLabel: fullDomain,
        isOwner
      }
    });
  } catch (error) {
    yield put({
      type: ensConstants.SEARCH_DOMAIN_FAILURE,
      payload: error?.message
    });
  }
}

export default searchDomain;
