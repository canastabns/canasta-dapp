import Web3Utils from 'web3-utils';

import * as Web3Interface from 'utils/web3';
import {CONTRACTS_ADDRESSES} from './address';
import {
  getStakeForMoreSameToken
} from './contracts';

export class StakeForMoreSameToken {
  constructor({networkId, web3}) {
    this.address = CONTRACTS_ADDRESSES.StakeForMoreTokens;
    this.web3 = web3;
    this.networkId = networkId;

    this.contactInstance = getStakeForMoreSameToken({
      web3,
      address: this.address
    });
    this.contact = this.contactInstance.methods;
  }

  /* Main methods */
  async stakeAmountOf(address) {
    return this.contact.stakeAmountOf(address).call();
  }

  async rewardOf(address) {
    return this.contact.rewardOf(address).call();
  }

  async createStake(amount) {
    const accounts = await Web3Interface.getAccounts();
    return this.contact.createStake(Web3Utils.toBN(amount)).send({ from: accounts[0] });
  }
}
