import * as Web3Interface from '../web3';
import {ENS} from './ens';
import {FirstGovernanceTokenSale} from './firstGovernanceTokenSale';
import {StakeForMoreSameToken} from './stakeForMoreSameToken';
import {CNSTContract} from './cnstToken';
import {setupRegistrar} from './registrar';

let ens = {},
  registrar = {},
  firstGovernanceTokenSale = {},
  stakeForMoreSameToken = {},
  cnstContract = {},
  ensRegistryAddress = undefined;

export const setupENS = async (config) => {
  const {web3} = await Web3Interface.getWeb3(config),
    networkId = await Web3Interface.getNetworkId();

  ens = await new ENS({
    web3,
    networkId
  });

  firstGovernanceTokenSale = await new FirstGovernanceTokenSale({
    web3,
    networkId
  });

  stakeForMoreSameToken = await new StakeForMoreSameToken({
    web3,
    networkId
  });

  cnstContract = await new CNSTContract({
    web3,
    networkId
  });

  ensRegistryAddress = ens.address;

  registrar = await setupRegistrar(ensRegistryAddress, web3);

  return {
    ens,
    registrar,
    firstGovernanceTokenSale,
    stakeForMoreSameToken,
    cnstContract
  };
};

export function getRegistrar() {
  return registrar;
}

export function getEnsAddress() {
  return ensRegistryAddress;
}

export default function getENS() {
  return ens;
}
