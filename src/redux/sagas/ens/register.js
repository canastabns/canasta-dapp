import * as R from 'ramda';
import {put, select} from 'redux-saga/effects';
import * as ensConstants from 'redux/constants/ens';
import * as ensSelectors from 'redux/selectors/ensSelector';
import * as LocalStorage from 'utils/commons/localstorage';
import {setupENS} from 'utils/ens';

const getApplicationState = () => select((state) => state);

function* register() {
  try {
    const applicationState = yield getApplicationState(),
      rentPrices = ensSelectors.getRentPrices(applicationState);

    if(!(rentPrices.data && rentPrices.data.duration >= 31536000))
      throw 'duration must be great that 31536000';

    const {registrar} = yield setupENS(),
      commitHashData = LocalStorage.getItem('@app/commitHash');

    yield registrar.register(
      commitHashData.domain,
      rentPrices.data.duration,
      commitHashData.secret
    );

    let domainsInStorage = LocalStorage.getItem('@app/myDomains');

    if(R.isEmpty(domainsInStorage) || !domainsInStorage)
      domainsInStorage = [];

    const exists = commitHashData.domain && domainsInStorage.find(e => e.domain === commitHashData.domain);

    if(commitHashData.domain && !exists)
      domainsInStorage.push({name: `${commitHashData.domain}.${process.env.REACT_APP_DOMAIN_TLD}`});

    LocalStorage.setItem('@app/myDomains', domainsInStorage);

    yield put({
      type: ensConstants.REGISTER_SUCCESS,
      payload: {}
    });

  } catch (error) {
    yield put({
      type: ensConstants.REGISTER_FAILURE,
      payload: error?.message
    });
  }
}

export default register;
