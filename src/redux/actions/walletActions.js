import * as constants from 'redux/constants/wallet';

export const walletConnect = payload => ({
  type: constants.CONNECT_WALLET_BEGIN,
  payload
});

export const walletDisconnect = payload => ({
  type: constants.DISCONNECT_WALLET_BEGIN
});

export const walletAccountChanged = address => ({
  type: constants.ACCOUNTS_CHANGED,
  payload: {
    address
  }
});

export const walletNetworkChanged = ({networkId, isCorrectedNetwork}) => ({
  type: constants.NETWORK_CHANGED,
  payload: {
    networkId,
    isCorrectedNetwork
  }
});
