import BaseRegistrarImplementation from './contracts/BaseRegistrarImplementation.json';
import BSCRegistrarController from './contracts/BSCRegistrarController.json';
import BulkRenewal from './contracts/BulkRenewal.json';
import CNST from './contracts/CNST.json';
import ENSContract from './contracts/ENSRegistry.json';
import FirstGovernanceTokenSale from './contracts/FirstGovernanceTokenSale.json';
import PublicResolver from './contracts/PublicResolver.json';
import ReverseRegistrar from './contracts/ReverseRegistrar.json';
import StablePriceOracle from './contracts/StablePriceOracle.json';
import StakeForMoreSameToken from './contracts/StakeForMoreSameToken.json';

export const getENSContract = ({ web3, address }) =>
  new web3.eth.Contract(ENSContract, address);

export const getPublicResolverContract = ({ web3, address }) =>
  new web3.eth.Contract(PublicResolver, address);

export const getReverseRegistrarContract = ({ web3, address }) =>
  new web3.eth.Contract(ReverseRegistrar, address);

export const getBaseRegistrarImplementationContract = ({ web3, address }) =>
  new web3.eth.Contract(BaseRegistrarImplementation, address);

export const getBSCRegistrarControllerContract = ({ web3, address }) =>
  new web3.eth.Contract(BSCRegistrarController, address);

export const getBulkRenewalContract = ({ web3, address }) =>
  new web3.eth.Contract(BulkRenewal, address);

export const getStablePriceOracleContract = ({ web3, address }) =>
  new web3.eth.Contract(StablePriceOracle, address);

export const getCNSTContract = ({ web3, address }) =>
  new web3.eth.Contract(CNST, address);

export const getFirstGovernanceTokenSaleContract = ({ web3, address }) =>
  new web3.eth.Contract(FirstGovernanceTokenSale, address);

export const getStakeForMoreSameToken = ({ web3, address }) =>
  new web3.eth.Contract(StakeForMoreSameToken, address);