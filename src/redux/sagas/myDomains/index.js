import {all, takeEvery} from 'redux-saga/effects';
import * as myDomainsConstants from 'redux/constants/myDomains';

import getMyDomains from './get';

export default function* rootInitialSaga() {
  yield all([
    takeEvery(myDomainsConstants.GET_MY_DOMAINS_BEGIN, getMyDomains)
  ]);
}
