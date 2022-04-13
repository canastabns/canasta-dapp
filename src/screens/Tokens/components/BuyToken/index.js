import {useState, useEffect} from 'react';

import {useBeforeFirstRender} from 'hooks';
import {useSelector, useDispatch} from 'react-redux';
import * as ensActions from 'redux/actions/ensActions';
import * as walletActions from 'redux/actions/walletActions';
import * as ensSelectors from 'redux/selectors/ensSelector';
import * as walletSelectors from 'redux/selectors/walletSelector';
import {NULL_ADDRESS} from 'utils/web3/addressHelpers';

import BuyTokenContainer from './BuyToken';

const BuyToken = () => {
  const dispatch = useDispatch();

  const [firstRender, setFirstRender] = useState(false),
    [amount, setAmount] = useState(1);

  const tokenSaleState = useSelector(state => ensSelectors.tokenSaleData(state)),
    walletState = useSelector(state => walletSelectors.getWalletState(state)),
    tokenPriceState = useSelector(state => ensSelectors.tokenPrice(state)),
    buyTokenState = useSelector(state => ensSelectors.buyToken(state));

  const providerConnect = (payload = {}) => dispatch(
    walletActions.walletConnect({...payload, dispatch})
  );

  useBeforeFirstRender(() => {
    if(!firstRender)
      setFirstRender(true);

    providerConnect();
  });

  useEffect(() => {
    if((firstRender && walletState.success) || buyTokenState.success)
      dispatch(ensActions.getTokenSaleData({
        address: walletState.address
      }));
  }, [firstRender, buyTokenState.success, walletState.success]);

  const amountInputHandler = e => setAmount(e.target.value),
    getTokenPrice = () => dispatch(ensActions.getTokenPrice({amount})),
    buyToken = () => dispatch(ensActions.buyToken({amount}));

  return (
    <BuyTokenContainer
      isLoadingData={firstRender && !tokenSaleState.success}
      isBuyLoading={buyTokenState.begin}

      tokenCostInBNB={tokenSaleState.data.tokenCostInBNB}
      contractTokenBalanceInEther={tokenSaleState.data.contractTokenBalanceInEther}
      accountBalanceInEther={tokenSaleState.data.accountBalanceInEther}
      walletAddress={walletState.address || NULL_ADDRESS}
      walletConnected={!!walletState.address}

      walletConnectHandler={() => providerConnect({withBrowserProvider: true})}
      amountInputHandler={amountInputHandler}
      getTokenPrice={getTokenPrice}
      buyToken={buyToken}

      amount={amount}
      tokenPriceIsLoading={tokenPriceState.begin}
      tokenPriceInEther={tokenPriceState.data.tokenPriceInEther}
      tokenAmount={tokenPriceState.data.amount}
    />
  );
};

export default BuyToken;
