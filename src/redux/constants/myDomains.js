import { createReduxName } from 'utils/redux';

export const reduxName = createReduxName('APP/MY_DOMAINS');

export const
  GET_MY_DOMAINS_BEGIN = `${reduxName}/GET_MY_DOMAINS_BEGIN`,
  GET_MY_DOMAINS_SUCCESS = `${reduxName}/GET_MY_DOMAINS_SUCCESS`,
  GET_MY_DOMAINS_FAILURE = `${reduxName}/GET_MY_DOMAINS_FAILURE`;
