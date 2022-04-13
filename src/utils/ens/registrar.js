import {labelhash, namehash, isEncodedLabelhash} from '@ensdomains/ui/src/utils';
import Promise from 'bluebird';
import EthVal from 'ethval';
import * as SecretHashCommit from 'utils/ens/secretHashCommit';
import * as Web3Interface from 'utils/web3';
import Web3Utils from 'web3-utils';

import {INTERFACES, CONTRACTS_ADDRESSES} from './address';
import {
  getENSContract,
  getPublicResolverContract,
  getBaseRegistrarImplementationContract,
  getBSCRegistrarControllerContract,
  getBulkRenewalContract,
  getStablePriceOracleContract
} from './contracts';

const TRANSFER_GAS_COST = 21000;

function checkArguments({
  registryAddress,
  ethAddress,
  web3
}) {
  if (!registryAddress) throw 'No registry address given to Registrar class';

  if (!ethAddress) throw `No .${process.env.REACT_APP_DOMAIN_TLD} address given to Registrar class`;

  if (!web3) throw 'Provider is required for Registrar';
}

export function getNamehash(name) {
  return namehash(name);
}

// Add 10% buffer to handle price fructuation.
// Any unused value will be sent back by the smart contract.
function getBufferedPrice(price) {
  const amount = (parseInt(price) * 110) / 100;
  return Web3Utils.toWei(`${amount}`, 'wei');
}

export default class Registrar {
  constructor({
    registryAddress,
    ethAddress,
    controllerAddress,
    bulkRenewalAddress,
    web3
  }) {
    checkArguments({
      registryAddress,
      ethAddress,
      web3
    });
    this.gracePeriod = 7;
    this.registryAddress = registryAddress;
    this.web3 = web3;

    this.stablePriceOracleContract = getStablePriceOracleContract({
      address: CONTRACTS_ADDRESSES.StablePriceOracle,
      web3
    });

    this.stablePriceOracle = this.stablePriceOracleContract.methods;

    this.permanentRegistrarContract = getBaseRegistrarImplementationContract({
      address: ethAddress,
      web3
    });
    this.permanentRegistrar = this.permanentRegistrarContract.methods;

    this.permanentRegistrarControllerContract = getBSCRegistrarControllerContract(
      {
        address: controllerAddress,
        web3
      }
    );
    this.permanentRegistrarController = this.permanentRegistrarControllerContract.methods;

    this.legacyAuctionRegistrar = {};

    this.bulkRenewalContract = getBulkRenewalContract({
      address: bulkRenewalAddress,
      web3
    });
    this.bulkRenewal = this.bulkRenewalContract.methods;

    this.ENSContract = getENSContract({
      web3,
      address: registryAddress
    });
    this.ENS = this.ENSContract.methods;
  }

  async getAddress(name) {
    try {
      const hash = namehash(name),
        resolverAddr = await this.ENS.resolver(hash).call(),
        Resolver = await getPublicResolverContract({
          address: resolverAddr,
          web3: this.web3
        }).methods;

      return Resolver['addr(bytes32)'](hash).call();
    } catch (error) {
      return '0x0';
    }
    finally {
      return '0x0';
    }
  }

  async getPermanentEntry(label) {
    const {
      permanentRegistrar: Registrar,
      permanentRegistrarController: RegistrarController
    } = this;

    let getAvailable,
      ret = {
        available: null,
        nameExpires: null
      };

    try {
      const labelHash = labelhash(label);

      // Returns true if name is available
      if (isEncodedLabelhash(label)) {
        getAvailable = Registrar.available(labelHash);
      } else {
        getAvailable = RegistrarController.available(label);
      }

      const [available, nameExpires, gracePeriod] = await Promise.all([
        getAvailable.call(),
        Registrar.nameExpires(labelHash).call(),
        this.getGracePeriod(Registrar)
      ]);

      ret = {
        ...ret,
        available,
        gracePeriod,
        nameExpires: nameExpires > 0 ? new Date(nameExpires * 1000) : null
      };

      // Returns registrar address if owned by new registrar.
      // Keep it as a separate call as this will throw exception for non existing domains
      ret.ownerOf = await Registrar.ownerOf(labelHash).call();
    } catch (e) {
      console.log('getPermanentEntry: Error getting permanent registrar entry', e);
      return false;
    } finally {
      return ret;
    }
  }

  async getEntry(label) {
    let [block, permEntry] = await Promise.all([
      Web3Interface.getBlock(),
      this.getPermanentEntry(label)
    ]);

    let ret = {
      currentBlockDate: new Date(block.timestamp * 1000),
      registrant: 0,
      transferEndDate: null,
      isNewRegistrar: false,
      gracePeriodEndDate: null
    };

    if (permEntry) {
      ret.available = permEntry.available;
      if (permEntry.nameExpires) {
        ret.expiryTime = permEntry.nameExpires;
      }
      if (permEntry.ownerOf) {
        ret.registrant = permEntry.ownerOf;
        ret.isNewRegistrar = true;
      } else if (permEntry.nameExpires) {
        const currentTime = new Date(ret.currentBlockDate);
        const gracePeriodEndDate = new Date(
          permEntry.nameExpires.getTime() + permEntry.gracePeriod * 1000
        );
        // It is within grace period
        if (permEntry.nameExpires < currentTime < gracePeriodEndDate) {
          ret.isNewRegistrar = true;
          ret.gracePeriodEndDate = gracePeriodEndDate;
        }
      }
    }

    return {
      ...ret
    };
  }

  async getGracePeriod(Registrar) {
    if (!this.gracePeriod) {
      this.gracePeriod = await Registrar.GRACE_PERIOD().call();
      return this.gracePeriod;
    }
    return this.gracePeriod;
  }

  async transferOwner(name, to) {
    try {
      const accounts = await Web3Interface.getAccounts(this.web3),
        nameArray = name.split('.'),
        labelHash = labelhash(nameArray[0]),
        account = accounts[0],
        Registrar = this.permanentRegistrar;

      return Registrar['safeTransferFrom(address,address,uint256)'](account, to, labelHash)
        .send({from: account});
    } catch (e) {
      console.log('Error calling transferOwner', e);
    }
  }

  async getRentPrice(name, duration) {
    const permanentRegistrarController = this.permanentRegistrarController;
    return permanentRegistrarController.rentPrice(name, duration).call();
  }

  async getFullRentPrice(name, duration) {
    const rentPrice = await this.getRentPrice(name, duration),
      bnbPriceInUSD = await this.getTokenPriceInUSD(),
      priceInWei = new EthVal(rentPrice, 'wei'),
      inWei = priceInWei.toWei().toNumber(),
      inGwei = priceInWei.toGwei().toNumber(),
      inBNB = priceInWei.toEth().toNumber().toFixed(5),
      inUSD = priceInWei
        .toEth()
        .mul((bnbPriceInUSD / 1e8))
        .toNumber()
        .toFixed(2);

    const gasEstimateInWei = 0,
      gasEstimateInGwei = 0,
      gasEstimateInBNB = (1 / (bnbPriceInUSD / 1e8)).toFixed(4),
      gasEstimateInUSD = 1;

    const
      totalInWei = 0,
      totalInGwei = 0,
      totalInBNB = Number(inBNB) + Number(gasEstimateInBNB),
      totalInUSD = Number(inUSD) + Number(gasEstimateInUSD);

    return {
      inWei,
      inGwei,
      inBNB,
      inUSD,

      gasEstimateInWei,
      gasEstimateInGwei,
      gasEstimateInBNB,
      gasEstimateInUSD,

      totalInWei,
      totalInGwei,
      totalInBNB,
      totalInUSD,

      duration
    };
  }

  async getRentPriceWithBuffer(name, duration) {
    const price = await this.getRentPrice(name, duration);
    return getBufferedPrice(price);
  }

  async getTokenPriceInUSD() {
    return this.stablePriceOracle.getTokenPriceInUSD().call();
  }

  async getRentPrices(labels, duration) {
    const pricesArray = await Promise.all(
      labels.map(label => {
        return this.getRentPrice(label, duration);
      })
    );
    return pricesArray.reduce((a, c) => a.add(c));
  }

  async getMinimumCommitmentAge() {
    const permanentRegistrarController = this.permanentRegistrarController;
    return permanentRegistrarController.minCommitmentAge().call();
  }

  async getMaximumCommitmentAge() {
    const permanentRegistrarController = this.permanentRegistrarController;
    return permanentRegistrarController.maxCommitmentAge().call();
  }

  async checkValidName(name) {
    const permanentRegistrarController = this.permanentRegistrarController;
    return permanentRegistrarController.valid(name).call();
  }

  async makeCommitment(name, owner, secret = '') {
    const permanentRegistrarController = this.permanentRegistrarController,
      accounts = await Web3Interface.getAccounts(this.web3),
      account = accounts[0],
      resolverAddr = await this.getAddress('resolver');

    if (parseInt(resolverAddr, 16) === 0) {
      return permanentRegistrarController.makeCommitment(name, owner, secret).call();
    } else {
      return permanentRegistrarController.makeCommitmentWithConfig(
        name,
        owner,
        secret,
        resolverAddr,
        account
      ).call();
    }
  }

  async checkCommitment(label, secret = '') {
    const permanentRegistrarController = this.permanentRegistrarController;
    const accounts = await Web3Interface.getAccounts(),
      account = accounts[0];

    const commitment = await this.makeCommitment(label, account, secret);
    return permanentRegistrarController.commitments(commitment).call();
  }

  async commit(label) {
    const permanentRegistrarController = this.permanentRegistrarController;
    const accounts = await Web3Interface.getAccounts(),
      account = accounts[0];

    const secret = SecretHashCommit.randomSecretHash(),
      commitment = await this.makeCommitment(label, account, secret),
      commit = await permanentRegistrarController.commit(commitment).send({from: account});

    return {
      commit,
      secret
    };
  }

  async register(label, duration, secret) {
    const permanentRegistrarController = this.permanentRegistrarController,
      accounts = await Web3Interface.getAccounts(),
      account = accounts[0],
      price = await this.getRentPrice(label, duration),
      priceWithBuffer = getBufferedPrice(price),
      resolverAddr = await this.getAddress('resolver');

    if (parseInt(resolverAddr, 16) === 0) {
      return permanentRegistrarController.register(
        label,
        account,
        duration,
        secret
      ).send({from: account, value: priceWithBuffer});
    } else {
      return permanentRegistrarController.registerWithConfig(
        label,
        account,
        duration,
        secret,
        resolverAddr,
        account
      ).send({from: account, value: priceWithBuffer});
    }
  }

  async estimateGasLimit(cb) {
    let gas = 0;
    try {
      gas = (await cb()).toNumber();
    } catch (e) {
      let matched = e.message.match(/\(supplied gas (.*)\)/) || e.message.match(/\(gas required exceeds allowance (.*)\)/);
      if (matched) {
        gas = parseInt(matched[1]);
      }
      console.log({gas, e, matched});
    }
    if (gas > 0) {
      return gas + TRANSFER_GAS_COST;
    } else {
      return gas;
    }
  }

  async renew(label, duration) {
    const permanentRegistrarController = this.permanentRegistrarController,
      price = await this.getRentPrice(label, duration),
      priceWithBuffer = getBufferedPrice(price),
      accounts = await Web3Interface.getAccounts(),
      account = accounts[0];

    return permanentRegistrarController
      .renew(label, duration)
      .send({from: account, value: priceWithBuffer});
  }

  async renewAll(labels, duration) {
    const bulkRenewal = this.bulkRenewal,
      prices = await this.getRentPrices(labels, duration),
      pricesWithBuffer = getBufferedPrice(prices),
      accounts = await Web3Interface.getAccounts(),
      account = accounts[0],
      gasLimit = await this.estimateGasLimit(() => {
        return bulkRenewal.estimateGas.renewAll(labels, duration, {value: pricesWithBuffer});
      });

    return bulkRenewal.renewAll(
      labels,
      duration,
      {value: pricesWithBuffer, gasLimit}
    )
      .send({from: account});
  }
}

export async function setupRegistrar(registryAddress, web3) {
  const ENSContract = await getENSContract({
      address: registryAddress,
      web3
    }),
    ENS = ENSContract.methods,
    resolverAddr = await ENS.resolver(namehash(process.env.REACT_APP_DOMAIN_TLD)).call();

  const Resolver = await getPublicResolverContract({
    address: resolverAddr,
    web3
  }).methods;

  let ethAddress = await ENS.owner(namehash(process.env.REACT_APP_DOMAIN_TLD)).call(),
    controllerAddress = await Resolver.interfaceImplementer(
      namehash(process.env.REACT_APP_DOMAIN_TLD),
      INTERFACES.permanentRegistrar
    ).call();

  let bulkRenewalAddress = await Resolver.interfaceImplementer(
    namehash(process.env.REACT_APP_DOMAIN_TLD),
    INTERFACES.bulkRenewal
  ).call();

  return new Registrar({
    registryAddress,
    ethAddress,
    controllerAddress,
    bulkRenewalAddress,
    web3
  });
}
