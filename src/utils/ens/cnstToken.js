import Web3Utils from 'web3-utils';

import {CONTRACTS_ADDRESSES} from './address';
import {
  getCNSTContract
} from './contracts';
import * as Web3Interface from 'utils/web3';

export class CNSTContract {
  constructor({networkId, web3}) {
    this.address = CONTRACTS_ADDRESSES.CNST;
    this.web3 = web3;
    this.networkId = networkId;

    this.contractInstance = getCNSTContract({
      web3,
      address: CONTRACTS_ADDRESSES.CNST
    });
    this.contract = this.contractInstance.methods;
  }

  /* Main methods */
  async balanceOf(address) {
    return this.contract.balanceOf(address).call();
  }

  async approve(spenser) {
    const accounts = await Web3Interface.getAccounts();
    const address = accounts[0];
    return this.contract.approve(spenser, Web3Utils.toWei(`${Number.MAX_SAFE_INTEGER}`, 'ether')).send({ from: address });
  }

  async isAllowance(owner, spender) {
    const amount = await this.contract.allowance(owner, spender).call();

    if (typeof amount === 'string')
      return Number(amount) > 0;
    
    return amount.gt('0');
  }
}
