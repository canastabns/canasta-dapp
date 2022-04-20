import {useEffect, useState} from 'react';

import Container from './Container';
import {useSelector, useDispatch} from 'react-redux';
import * as walletSelectors from 'redux/selectors/walletSelector';
import {useBeforeFirstRender} from 'hooks';
import * as walletActions from 'redux/actions/walletActions';
import * as ensActions from 'redux/actions/ensActions';
import * as ensSelectors from 'redux/selectors/ensSelector';
import {NULL_ADDRESS} from 'utils/web3/addressHelpers';

const StakingTokenScreen = () => {
  const dispatch = useDispatch();

  const [firstRender, setFirstRender] = useState(false),
    [amount, setAmount] = useState(1);
  
  const walletState = useSelector(state => walletSelectors.getWalletState(state)),
    tokenForMoreTokensData = useSelector(state => ensSelectors.tokenForMoreTokensData(state)),
    allowanceData = useSelector(state => ensSelectors.allowanceTokenForMoreTokens(state)),
    approveState = useSelector(state => ensSelectors.approveTokenForMoreTokens(state)),
    createStakeState = useSelector(state => ensSelectors.crateStakeTokenForMoreTokens(state));

  const providerConnect = (payload = {}) => dispatch(
    walletActions.walletConnect({...payload, dispatch})
  );
  
  useBeforeFirstRender(() => {
    if(!firstRender)
      setFirstRender(true);

    providerConnect();
  });

  useEffect(() => {
    if((firstRender && walletState.success))
      dispatch(ensActions.getTokenForMoreTokensData({
        address: walletState.address
      }));
  }, [firstRender, walletState.success]);

  useEffect(() => {
    if(walletState.success) {
      dispatch(ensActions.checkAllowanceTokenForMoreTokens({
        address: walletState.address
      }));
    }
  }, [walletState.success]);

  useEffect(() => {
    if(createStakeState.success)
      dispatch(ensActions.getTokenForMoreTokensData({
        address: walletState.address
      }));
  }, [createStakeState.success]);

  const amountInputHandler = e => setAmount(e.target.value);

  const approveHandler = () => dispatch(ensActions.approveTokenForMoreTokens( { address: walletState.address }));

  const createStakeHandler = () => {
    if (amount > 0)
      dispatch(ensActions.createStakeTokenForMoreTokens({ amount }));
  };

  return (
    <Container
      isLoading={firstRender && !tokenForMoreTokensData.success}
      walletAddress={walletState.address || NULL_ADDRESS}
      walletConnected={!!walletState.address}
      data={tokenForMoreTokensData.data}
      amount={amount}
      isAllowance={allowanceData.data.isAllowance}
      approveIsLoading={approveState.begin}
      createStakeIsLoading={createStakeState.begin}

      walletConnectHandler={() => providerConnect({withBrowserProvider: true})}
      amountInputHandler={amountInputHandler}
      approveHandler={approveHandler}
      createStakeHandler={createStakeHandler}
    />
  );
};

export default StakingTokenScreen;
