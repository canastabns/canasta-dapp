import {useParams} from 'react-router-dom';
import {useBeforeFirstRender} from 'hooks';
import {useDispatch, useSelector} from 'react-redux';
import * as myDomainActions from 'redux/actions/myDomainsActions';
import * as myDomainsSelectors from 'redux/selectors/myDomainsSelector';

import Container from './container';

const MyDomains = () => {
  const routerParams = useParams();
  const dispatch = useDispatch(),
    fetchMyDomains = ({ address }) => dispatch(myDomainActions.fetchMyDomains({ address }));

  const domains = useSelector(state => myDomainsSelectors.getMyDomains(state));

  useBeforeFirstRender(() => {
    fetchMyDomains({
      address: routerParams.address
    });
  });

  return (
    <Container domains={domains.data} />
  );
};

export default MyDomains;
