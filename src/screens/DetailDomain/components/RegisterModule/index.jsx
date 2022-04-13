import {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import * as ensActions from 'redux/actions/ensActions';
import * as ensSelectors from 'redux/selectors/ensSelector';
import * as walletSelectors from 'redux/selectors/walletSelector';

import RegisterContainer from './components/RegisterContainer';
import WaitRegisterContainer from './components/WaitRegisterContainer';

const RegisterDomain = (props) => {
  const dispatch = useDispatch(),
    rentPrices = useSelector(state => ensSelectors.getRentPrices(state)),
    wallet = useSelector(state => walletSelectors.getWalletState(state)),
    commit = useSelector(state => ensSelectors.getCommit(state)),
    searchData = useSelector(state => ensSelectors.getSearchDomain(state)),
    registerData = useSelector(state => ensSelectors.getRegisterData(state));

  const arrayStep = [1, 2, 3];
  const [timeSelected, setTimeSelected] = useState(1);

  useEffect(() => {
    if(registerData.success)
      window.location.reload(true);
  }, [registerData.success]);

  const getRentPrices = duration => dispatch(ensActions.getRentPrices({
    domain: searchData?.data?.domain,
    duration
  }));

  const sendCommit = () => dispatch(ensActions.sendCommit({})),
    register = () => dispatch(ensActions.register({}));

  const addTimeHandler = () => {
    const newTimeSelected = timeSelected + 1;
    setTimeSelected(newTimeSelected);
    getRentPrices(newTimeSelected);
  };

  const lessTimeHandler = () => {
    if (timeSelected <= 1)
      return;

    const newTimeSelected = timeSelected - 1;
    setTimeSelected(newTimeSelected);
    getRentPrices(newTimeSelected);
  };

  return (
    <>
      {(!commit.success) && (
        <RegisterContainer
          lessTimeHandler={lessTimeHandler}
          addTimeHandler={addTimeHandler}
          timeSelected={timeSelected}
          rentPricesBegin={rentPrices.begin}
          rentPricesSuccess={rentPrices.success}
          rentPrices={rentPrices.data}
          arrayStep={arrayStep}
          sendCommit={sendCommit}
          wallet={wallet}
        />
      )}

      {(commit.success) && (
        <WaitRegisterContainer
          commitSuccess={commit.success}
          registerBegin={registerData.begin}
          registerSuccess={registerData.success}
          register={register}
          steps={arrayStep}
        />
      )}
    </>
  );
};

export default RegisterDomain;
