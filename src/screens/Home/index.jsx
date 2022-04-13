import {useState} from 'react';

import {useBeforeFirstRender} from 'hooks';
import {useDispatch} from 'react-redux';
import * as walletActions from 'redux/actions/walletActions';

import Container from './container';

function App(props) {
  const [domain, setDomain] = useState('');

  const dispatch = useDispatch(),
    providerConnect = (payload = {}) => dispatch(
      walletActions.walletConnect({...payload, dispatch})
    );

  useBeforeFirstRender(async () => {
    providerConnect();
  });

  const domainHandler = e => e && e.target && setDomain(e.target.value);

  return (
    <Container
      isLoading={false}
      domain={domain}
      domainHandler={domainHandler}
    />
  );
}

export default App;
