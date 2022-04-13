import * as Web3Interface from 'utils/web3';

import {CONTRACTS_ADDRESSES} from './address';
import {
  getCNSTContract,
  getFirstGovernanceTokenSaleContract
} from './contracts';


export class FirstGovernanceTokenSale {
  constructor({networkId, web3}) {
    this.address = CONTRACTS_ADDRESSES.FirstGovernanceTokenSale;
    this.web3 = web3;
    this.networkId = networkId;

    this.firstGovernanceTokenSaleContract = getFirstGovernanceTokenSaleContract({
      web3,
      address: this.address
    });
    this.firstGovernanceTokenSale = this.firstGovernanceTokenSaleContract.methods;

    this.CNSTContract = getCNSTContract({
      web3,
      address: CONTRACTS_ADDRESSES.CNST
    });
    this.CNST = this.CNSTContract.methods;
  }

  /* Main methods */
  async getTokenSaleCost() {
    return this.firstGovernanceTokenSale.tokenSaleCost().call();
  }

  async getTokenBalance() {
    return this.CNST.balanceOf(CONTRACTS_ADDRESSES.FirstGovernanceTokenSale).call();
  }

  async tokenBalanceOf(address) {
    return this.CNST.balanceOf(address).call();
  }

  async getPrice(amount) {
    return this.firstGovernanceTokenSale.getPrice(amount).call();
  }

  async buyToken(amount) {
    const cost = await this.getPrice(amount);
    const accounts = await Web3Interface.getAccounts();

    return this.firstGovernanceTokenSale.buyToken(amount).send({value: cost, from: accounts[0]});
  }
}
