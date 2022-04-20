import axios from 'axios';
import * as R from 'ramda';
import {put} from 'redux-saga/effects';
import * as myDomainsConstants from 'redux/constants/myDomains';

const getDomainsByOwnerAddress = (address) => {
  return axios.post(process.env.REACT_APP_CANASTA_GRAPH, {
    query : `
          {
        domains(where: { owner: "${address}"}, first: 50) {
          id
          name
          labelName
          labelhash
          owner {
            id
          }
        }
      }
    `
  }, {});
};


function* get({payload}) {
  try {
    const result = yield getDomainsByOwnerAddress(payload.address && payload.address.toLowerCase());
    const domains = R.pathOr([], ['data', 'data', 'domains'], result);

    yield put({
      type: myDomainsConstants.GET_MY_DOMAINS_SUCCESS,
      payload: domains
    });
  } catch (error) {
    yield put({
      type: myDomainsConstants.GET_MY_DOMAINS_FAILURE,
      payload: error?.message
    });
  }
}

export default get;
