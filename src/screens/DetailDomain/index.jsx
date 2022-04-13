import {useState, useEffect} from 'react';

import {useBeforeFirstRender} from 'hooks';
import {useDispatch, useSelector} from 'react-redux';
import * as ensActions from 'redux/actions/ensActions';
import * as walletActions from 'redux/actions/walletActions';
import * as ensSelector from 'redux/selectors/ensSelector';
import * as walletSelector from 'redux/selectors/walletSelector';

import DetailsModule from './components/DetailsModule';
import RegisterModule from './components/RegisterModule';
import SubDomainModule from './components/SubDomainModule';
import DetailDomainContainer from './container';

const Details = (props) => {
  const dispatch = useDispatch();

  const searchDomain = ({domainName, connectedAddress}) => dispatch(ensActions.searchDomain({
      domainName,
      connectedAddress
    })),
    providerConnect = (payload = {}) => dispatch(
      walletActions.walletConnect({...payload, dispatch})
    );

  const wallet = useSelector(state => walletSelector.getWalletState(state)),
    searchData = useSelector(state => ensSelector.getSearchDomain(state));

  const [activeTab, setActiveTab] = useState(0),
    [tabs, setTabs] = useState([
      {
        show: false,
        onClick: i => setActiveTab(i),
        label: 'Registrar',
        Component: RegisterModule
      },
      {
        show: true,
        onClick: i => setActiveTab(i),
        label: 'Detalles',
        Component: DetailsModule
      },
      {
        show: false,
        onClick: i => setActiveTab(i),
        label: 'Subdominios',
        Component: SubDomainModule
      }
    ]);

  useBeforeFirstRender(async () => {
    providerConnect();
  });

  useEffect(() => {
    searchDomain({
      domainName: props?.match?.params?.domain,
      connectedAddress: wallet.address
    });
  }, [wallet.address]);

  useEffect(() => {
    let newTabs = [...tabs],
      defaultActiveTab = 1;
    newTabs[0] = {...newTabs[0], show: false};

    if (searchData.data.available) {
      defaultActiveTab = 0;
      newTabs[0] = {...newTabs[0], show: true};
    }

    setTabs(newTabs);
    setActiveTab(defaultActiveTab);
  }, [searchData.data.available]);

  return (
    <DetailDomainContainer
      searchBegin={searchData?.begin}
      searchSuccess={searchData?.success}
      searchError={searchData?.error}
      domainLabel={searchData.data.domainLabel}
      domain={searchData.data.domain}
      domainAvailable={searchData.data.available}
      activeTab={activeTab}
      tabs={tabs}
    />
  );
};

export default Details;
