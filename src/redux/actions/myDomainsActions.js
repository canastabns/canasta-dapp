import * as constants from 'redux/constants/myDomains';

export const fetchMyDomains = payload => ({
  type: constants.GET_MY_DOMAINS_BEGIN,
  payload
});
