import {formatsByName} from '@ensdomains/address-encoder';
import {labelhash, namehash} from '@ensdomains/ui/src/utils';
import { utils } from 'ethers';

import * as Web3Interface from '../web3';
import {NULL_ADDRESS} from '../web3/addressHelpers';
import {CONTRACTS_ADDRESSES} from './address';
import {decodeContenthash, encodeContenthash} from './contents';
import {
  getENSContract,
  getPublicResolverContract,
  getReverseRegistrarContract
} from './contracts';


export function getNamehash(name) {
  return namehash(name);
}

function getLabelhash(label) {
  return labelhash(label);
}

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

export class ENS {
  constructor({networkId, address, web3}) {
    this.address = address || CONTRACTS_ADDRESSES.ENSRegistry;
    this.web3 = web3;
    this.networkId = networkId;

    this.ENSContract = getENSContract({
      web3,
      address: this.address
    });

    this.ENS = this.ENSContract.methods;
  }

  /* Get the raw Ethers contract object */
  getENSContractInstance() {
    return this.ENS;
  }

  /* Main methods */

  async getOwner(name) {
    const namehash = getNamehash(name);
    return this.ENS.owner(namehash).call();
  }

  async getAccounts() {
    const accounts = await Web3Interface.getAccounts(this.web3);

    console.log('accounts: ', accounts);

    return accounts;
  }

  async getResolver(name) {
    const namehash = getNamehash(name);
    return this.ENS.resolver(namehash).call();
  }

  async getTTL(name) {
    const namehash = getNamehash(name);
    return this.ENS.ttl(namehash).call();
  }

  //@TODO REVISAR
  async getEthAddressWithResolver(name, resolverAddr) {
    if (parseInt(resolverAddr, 16) === 0)
      return EMPTY_ADDRESS;

    const namehash = getNamehash(name);
    try {
      const Resolver = getPublicResolverContract({
        address: resolverAddr,
        web3: this.web3
      }).methods;
      return Resolver['addr(bytes32)'](namehash).call();
    } catch (e) {
      console.log('error: ', e);
      console.warn(
        'Error getting addr on the resolver contract, are you sure the resolver address is a resolver contract?'
      );
      return EMPTY_ADDRESS;
    }
  }

  async getAddress(name) {
    const resolverAddr = await this.getResolver(name);
    return this.getEthAddressWithResolver(name, resolverAddr);
  }

  async getContent(name) {
    const resolverAddr = await this.getResolver(name);
    return this.getContentWithResolver(name, resolverAddr);
  }

  async getContentWithResolver(name, resolverAddr) {
    if (parseInt(resolverAddr, 16) === 0)
      return EMPTY_ADDRESS;
    try {
      const namehash = getNamehash(name);
      const Resolver = getPublicResolverContract({
        address: resolverAddr,
        web3: this.web3
      }).methods;

      const contentHashSignature = utils
        .solidityKeccak256(['string'], ['contenthash(bytes32)'])
        .slice(0, 10);

      const isContentHashSupported = await Resolver.supportsInterface(
        contentHashSignature
      ).call();

      if (isContentHashSupported) {
        const encoded = await Resolver.contenthash(namehash).call();
        const {protocolType, decoded, error} = decodeContenthash(encoded);
        if (error) {
          return {
            value: error,
            contentType: 'error'
          };
        }
        return {
          value: `${protocolType}://${decoded}`,
          contentType: 'contenthash'
        };
      } else {
        const value = await Resolver.content(namehash).call();
        return {
          value,
          contentType: 'oldcontent'
        };
      }
    } catch (e) {
      const message =
        'Error getting content on the resolver contract, are you sure the resolver address is a resolver contract?';
      console.warn(message, e);
      return {value: message, contentType: 'error'};
    }
  }

  async getText(name, key) {
    const resolverAddr = await this.getResolver(name);
    return this.getTextWithResolver(name, key, resolverAddr);
  }

  async getTextWithResolver(name, key, resolverAddr) {
    if (parseInt(resolverAddr, 16) === 0) {
      return '';
    }
    const namehash = getNamehash(name);
    try {
      const Resolver = getPublicResolverContract({
        address: resolverAddr,
        web3: this.web3
      }).methods;

      return Resolver.text(namehash, key).call();
    } catch (e) {
      console.warn(
        'Error getting text record on the resolver contract, are you sure the resolver address is a resolver contract?'
      );
      return '';
    }
  }

  async getName(address) {
    const reverseNode = `${address.slice(2)}.addr.reverse`;
    const resolverAddr = await this.getResolver(reverseNode);
    return this.getNameWithResolver(address, resolverAddr);
  }

  async getNameWithResolver(address, resolverAddr) {
    const reverseNode = `${address.slice(2)}.addr.reverse`;
    const reverseNamehash = getNamehash(reverseNode);
    if (parseInt(resolverAddr, 16) === 0) {
      return {
        name: null
      };
    }

    try {
      const Resolver = getPublicResolverContract({
        address: resolverAddr,
        web3: this.web3
      }).methods;
      const name = await Resolver.name(reverseNamehash).call();
      return {
        name
      };
    } catch (e) {
      console.log(`Error getting name for reverse record of ${address}`, e);
    }
  }

  async isMigrated(name) {
    const namehash = getNamehash(name);
    return this.ENS.recordExists(namehash).call();
  }

  async getResolverDetails(node) {
    try {
      const addrPromise = this.getAddress(node.name);
      const contentPromise = this.getContent(node.name);
      const [addr, content] = await Promise.all([addrPromise, contentPromise]);
      return {
        ...node,
        addr,
        content: content.value,
        contentType: content.contentType
      };
    } catch (e) {
      return {
        ...node,
        addr: '0x0',
        content: '0x0',
        contentType: 'error'
      };
    }
  }

  // @TODO FALTA
  async getSubdomains() {
    return {};
  }

  // @TODO FALTA
  async getDomainDetails(name) {
    const nameArray = name.split('.'),
      labelhash = getLabelhash(nameArray[0]),
      [owner, resolver] = await Promise.all([
        this.getOwner(name),
        this.getResolver(name)
      ]),
      node = {
        name,
        label: nameArray[0],
        labelhash,
        owner,
        resolver
      },
      hasResolver = parseInt(node.resolver, 16) !== 0;

    if (hasResolver) {
      return this.getResolverDetails(node);
    }

    return {
      ...node,
      addr: null,
      content: null
    };
  }

  async setOwner(name, newOwner) {
    const namehash = getNamehash(name);
    const accounts = await Web3Interface.getAccounts(this.web3);
    return this.ENS.setOwner(namehash, newOwner).send({from: accounts[0]});
  }

  async setSubnodeOwner(name, newOwner) {
    const accounts = await Web3Interface.getAccounts(this.web3),
      nameArray = name.split('.'),
      label = nameArray[0],
      node = nameArray.slice(1).join('.'),
      labelhash = getLabelhash(label),
      parentNamehash = getNamehash(node);

    return this.ENS.setSubnodeOwner(parentNamehash, labelhash, newOwner).send({from: accounts[0]});
  }

  async setSubnodeRecord(name, newOwner, resolver) {
    const accounts = await Web3Interface.getAccounts(),
      nameArray = name.split('.'),
      label = nameArray[0],
      node = nameArray.slice(1).join('.'),
      labelhash = getLabelhash(label),
      parentNamehash = getNamehash(node),
      ttl = await this.getTTL(name);

    console.log('this.web3: ', this.web3);
    console.log('accounts: ', accounts);

    return this.ENS.setSubnodeRecord(
      parentNamehash,
      labelhash,
      newOwner,
      resolver,
      ttl
    ).send({from: accounts[0]});
  }

  async setResolver(name, resolver) {
    const namehash = getNamehash(name),
      accounts = await Web3Interface.getAccounts(this.web3);
    return this.ENS.setResolver(namehash, resolver).send({from: accounts[0]});
  }

  async setAddress(name, address) {
    let resolverAddr = await this.getResolver(name);

    if(resolverAddr === NULL_ADDRESS) {
      await this.setResolver(name, CONTRACTS_ADDRESSES.PublicResolver);
      resolverAddr = await this.getResolver(name);
    }

    return this.setAddressWithResolver(name, address, resolverAddr);
  }

  async setAddressWithResolver(name, address, resolverAddr) {
    const namehash = getNamehash(name),
      Resolver = getPublicResolverContract({
        address: resolverAddr,
        web3: this.web3
      }).methods,
      accounts = await Web3Interface.getAccounts(this.web3);

    return Resolver['setAddr(bytes32,address)'](namehash, address).send({from: accounts[0]});
  }

  async setContent(name, content) {
    const resolverAddr = await this.getResolver(name);
    return this.setContentWithResolver(name, content, resolverAddr);
  }

  async setContentWithResolver(name, content, resolverAddr) {
    const namehash = getNamehash(name),
      Resolver = getPublicResolverContract({
        address: resolverAddr,
        web3: this.web3
      }).methods,
      accounts = await Web3Interface.getAccounts(this.web3);
    return Resolver.setContent(namehash, content).send({from: accounts[0]});
  }

  async setContenthash(name, content) {
    const resolverAddr = await this.getResolver(name);
    return this.setContenthashWithResolver(name, content, resolverAddr);
  }

  async setContenthashWithResolver(name, content, resolverAddr) {
    let encodedContenthash = content;
    if (parseInt(content, 16) !== 0) {
      encodedContenthash = encodeContenthash(content);
    }
    const namehash = getNamehash(name),
      Resolver = getPublicResolverContract({
        address: resolverAddr,
        web3: this.web3
      }).methods,
      accounts = await Web3Interface.getAccounts(this.web3);

    return Resolver.setContenthash(namehash, encodedContenthash).send({from: accounts[0]});
  }

  async setText(name, key, recordValue) {
    const resolverAddr = await this.getResolver(name);
    return this.setTextWithResolver(name, key, recordValue, resolverAddr);
  }

  async setTextWithResolver(name, key, recordValue, resolverAddr) {
    const namehash = getNamehash(name),
      Resolver = getPublicResolverContract({
        address: resolverAddr,
        web3: this.web3
      }).methods,
      accounts = await Web3Interface.getAccounts(this.web3);

    return Resolver.setText(namehash, key, recordValue).send({from: accounts[0]});
  }

  async createSubdomain(name) {
    const accounts = await Web3Interface.getAccounts(this.web3),
      account = accounts[0],
      publicResolverAddress = await this.getAddress('resolver');
    try {
      return this.setSubnodeRecord(name, account, publicResolverAddress);
    } catch (e) {
      console.log('error creating subdomain', e);
    }
  }

  async deleteSubdomain(name) {
    try {
      return this.setSubnodeRecord(name, EMPTY_ADDRESS, EMPTY_ADDRESS);
    } catch (e) {
      console.log('error deleting subdomain', e);
    }
  }

  async claimAndSetReverseRecordName(name, overrides = {}) {
    const reverseRegistrarAddr = await this.getOwner('addr.reverse'),
      reverseRegistrar = getReverseRegistrarContract({
        address: reverseRegistrarAddr,
        web3: this.web3
      }).methods,
      accounts = await Web3Interface.getAccounts(this.web3),
      networkId = await Web3Interface.getNetworkId(this.web3);

    if (parseInt(networkId) > 1000) {
      const gasLimit = await reverseRegistrar.estimateGas.setName(name)
        .send({from: accounts[0]});
      overrides = {
        gasLimit: gasLimit.toNumber() * 2,
        ...overrides
      };
    }

    return reverseRegistrar.setName(name, overrides).send({from: accounts[0]});
  }

  async setReverseRecordName(name) {
    const accounts = await Web3Interface.getAccounts(this.web3),
      account = accounts[0],
      reverseNode = `${account.slice(2)}.addr.reverse`,
      resolverAddr = await this.getResolver(reverseNode),
      Resolver = getPublicResolverContract({
        address: resolverAddr,
        web3: this.web3
      }).methods;

    let namehash = getNamehash(reverseNode);
    return Resolver.setName(namehash, name).send({from: account});
  }

  async getENSEvent() {
    return [];
  }
}
