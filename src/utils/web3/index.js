import * as LocalStorage from 'utils/commons/localstorage';
import Web3 from 'web3';

import {createWeb3Modal} from './createWeb3Modal';

let web3Modal,
  provider,
  web3;

export const getWeb3 = async (config) => {
  const connectWithBrowserProvider = isConnectWithWebProvider();

  if (config?.withBrowserProvider || connectWithBrowserProvider) {
    web3Modal = await createWeb3Modal();
    provider = await web3Modal.connect();
    LocalStorage.setItem('@app/browserProvider', {provider: '1'});
  } else {
    provider = new Web3.providers.HttpProvider(process.env.REACT_APP_WEB3_HTTP_PROVIDER);
  }

  web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: 'chainId',
        call: 'eth_chainId',
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });

  return {web3, web3Modal, provider};
};

export const getAccounts = (_web3 = web3) => _web3.eth.getAccounts();

export const getNetworkId = async (_web3 = web3) => {
  let networkId = await _web3.eth.getChainId();
  // Trust provider returns an incorrect chainId for BSC.
  if (networkId === 86)
    networkId = 56;

  return networkId;
};

export async function getBlock(number = 'latest', _web3 = web3) {
  try {
    const blockDetails = await _web3.eth.getBlock(number);
    return {
      number: blockDetails.number,
      timestamp: blockDetails.timestamp
    };
  } catch (e) {
    console.log('error getting block details', e);
    return {
      number: 0,
      timestamp: 0
    };
  }
}

export const getBalance = async (_web3 = web3) => {
  const accounts = await getAccounts();
  return web3.eth.getBalance(accounts[0]);
};

export const isConnectWithWebProvider = () => {
  const data = LocalStorage.getItem('@app/browserProvider');
  return data?.provider;
};

export const clearCachedProvider = () => {
  web3Modal.clearCachedProvider();
  LocalStorage.removeItem('@app/browserProvider');
};

export const isCorrectedNetwork = async (_web3 = web3) => {
  let networkId = await getNetworkId(_web3);
  return Number(networkId) === Number(process.env.REACT_APP_NETWORK_ID);
};
