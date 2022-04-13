export const CONTRACTS_ADDRESSES = {
  'ENSRegistry': process.env.REACT_APP_ENSRegistry,
  'PublicResolver': process.env.REACT_APP_PublicResolver,
  'FIFSRegistrar': process.env.REACT_APP_FIFSRegistrar,
  'ReverseRegistrar': process.env.REACT_APP_ReverseRegistrar,
  'BaseRegistrarImplementation': process.env.REACT_APP_BaseRegistrarImplementation,
  'StablePriceOracle': process.env.REACT_APP_StablePriceOracle,
  'BSCRegistrarController': process.env.REACT_APP_BSCRegistrarController,
  'BulkRenewal': process.env.REACT_APP_BulkRenewal,
  'FirstGovernanceTokenSale': process.env.REACT_APP_FirstGovernanceTokenSale,
  'CNST': process.env.REACT_APP_CNST,
  'StakeForMoreTokens': process.env.REACT_APP_STAKE_FOR_MORE_TOKENS
};

export const INTERFACES = {
  legacyRegistrar: '0x7ba18ba1',
  permanentRegistrar: '0x018fac06',
  permanentRegistrarWithConfig: '0xca27ac4c',
  baseRegistrar: '0x6ccb2df4',
  dnsRegistrar: '0x1aa2e641',
  bulkRenewal: '0x3150bfba'
};
