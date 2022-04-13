import {put, select} from 'redux-saga/effects';
import * as ensConstants from 'redux/constants/ens';
import * as ensSelectors from 'redux/selectors/ensSelector';
import * as LocalStorage from 'utils/commons/localstorage';
import {setupENS} from 'utils/ens';

const getApplicationState = () => select((state) => state);

const sleep = (ms = 5000) => new Promise((resolve, reject) => {
  try {
    setTimeout(async () => {
      resolve(true);
    }, ms);
  } catch (error) {
    reject(error);
  }
});

function* sendCommit({payload}) {
  try {
    const applicationState = yield getApplicationState(),
      ens = ensSelectors.getSearchDomain(applicationState),
      domainLabel = ens.data.domain;

    const {registrar} = yield setupENS();

    const isValidName = yield registrar.checkValidName(domainLabel);
    if(!isValidName) {
      console.log('im sorry it\'s not valid name');
      return false;
    }

    const domainData = yield registrar.getPermanentEntry(domainLabel);

    if(!domainData.available) {
      console.log('im sorry it\'s not available domain');
      return false;
    }

    const commitData = yield registrar.commit(domainLabel);

    LocalStorage.setItem('@app/commitHash', {
      secret: commitData.secret,
      domain: domainLabel
    });

    yield put({
      type: ensConstants.COMMIT_SUCCESS,
      payload: {
        secret: commitData.secret
      }
    });

  } catch (error) {
    yield put({
      type: ensConstants.COMMIT_FAILURE,
      payload: error?.message
    });
  }
}

export default sendCommit;
