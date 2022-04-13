import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal, {connectors} from 'web3modal';

import binanceWalletImage from './images/binance-wallet.png';
import matchWalletImage from './images/math-wallet.svg';
import safeWalletImage from './images/safepal-wallet.svg';
import trustWalletImage from './images/trust-wallet.svg';

const t = text => text;

export const createWeb3Modal = () => new Web3Modal({
  network: 'binance',
  cacheProvider: true,
  providerOptions: {
    injected: {
      display: {
        name: 'Metamask',
        description: t('Home-BrowserWallet')
      }
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: 'https://bsc-dataseed.binance.org/',
          56: 'https://bsc-dataseed.binance.org/',
          97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
        }
      }
    },
    'custom-binance': {
      display: {
        name: 'Binance',
        description: t('Binance Chain Wallet'),
        logo: binanceWalletImage
      },
      package: 'binance',
      connector: async (ProviderPackage, options) => {
        const provider = window.BinanceChain;
        await provider.enable();
        return provider;
      }
    },
    'custom-math': {
      display: {
        name: 'Math',
        description: t('Math Wallet'),
        logo: matchWalletImage
      },
      package: 'math',
      connector: connectors.injected
    },
    'custom-twt': {
      display: {
        name: 'Trust',
        description: t('Trust Wallet'),
        logo: trustWalletImage
      },
      package: 'twt',
      connector: connectors.injected
    },
    'custom-safepal': {
      display: {
        name: 'SafePal',
        description: t('SafePal App'),
        logo: safeWalletImage
      },
      package: 'safepal',
      connector: connectors.injected
    }
  }
});
