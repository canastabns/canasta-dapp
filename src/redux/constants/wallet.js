import { createReduxName } from 'utils/redux';

export const reduxName = createReduxName('WALLET');

export const DISCONNECT_WALLET_BEGIN = `${reduxName}/DISCONNECT_WALLET_BEGIN`,
  DISCONNECT_WALLET_SUCCESS = `${reduxName}/DISCONNECT_WALLET_SUCCESS`,
  DISCONNECT_WALLET_FAILURE = `${reduxName}/DISCONNECT_WALLET_FAILURE`;

export const CONNECT_WALLET_BEGIN = `${reduxName}/CONNECT_WALLET_BEGIN`,
  CONNECT_WALLET_SUCCESS = `${reduxName}/CONNECT_WALLET_SUCCESS`,
  CONNECT_WALLET_FAILURE = `${reduxName}/CONNECT_WALLET_FAILURE`,
  ACCOUNTS_CHANGED = `${reduxName}/ACCOUNTS_CHANGED`,
  NETWORK_CHANGED = `${reduxName}/NETWORK_CHANGED`;
