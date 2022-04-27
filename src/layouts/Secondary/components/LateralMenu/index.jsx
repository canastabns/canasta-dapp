import {ReactComponent as CommentIcon} from 'assets/svg/icon-comment.svg';
import {ReactComponent as YellowHeartIcon} from 'assets/svg/icon-yellow-heart.svg';
import {ReactComponent as DocIcon} from 'assets/svg/icon-yellow-list.svg';
import {ReactComponent as Staking} from 'assets/svg/staking.svg';
import BaseChangeLanguage from 'components/BaseChangeLanguage';
import BaseConnect from 'components/BaseConnect';
import BaseLateralOption from 'components/BaseLateralOption';
import {useHistory} from 'react-router-dom';

import styles from './styles.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import * as WalletSelects from 'redux/selectors/walletSelector';
import * as Web3Interface from 'utils/web3';
import {useBeforeFirstRender} from 'hooks';
import * as walletActions from 'redux/actions/walletActions';

const LateralMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory(),
    providerConnect = (payload = {}) => dispatch(
      walletActions.walletConnect({...payload, dispatch})
    );

  useBeforeFirstRender(async () => {
    providerConnect();
  });

  const wallet = useSelector(state => WalletSelects.getWalletState(state));
  
  return(
    <div className={styles.container}>
     
      <div className={styles.lateralMenuOption}>
        <BaseConnect />
      </div>

      {(Web3Interface.isConnectWithWebProvider() || !wallet.readOnly) && (
        <div className={styles.lateralMenuOption}>
          <BaseLateralOption
            onClick={() => window.location.href = `/domains/${wallet.address}`}
            Icon={<DocIcon width={25} height={25} />}
            text="detailPage.menu.myDomains"
          />
        </div>
      )}

      <div className={styles.lateralMenuOption}>
        <BaseLateralOption
          onClick={() => history.push('/favourites')}
          Icon={<YellowHeartIcon width={25} height={25} />}
          text="detailPage.menu.favourites"
        />
      </div>

      <div className={styles.lateralMenuOption}>
        <BaseLateralOption
          onClick={() => window.location.href = 'https://blog.canasta.domains/'}
          Icon={<CommentIcon width={25} height={25} />}
          text="detailPage.menu.faq"
        />
      </div>

      <div className={styles.lateralMenuOption}>
        <BaseLateralOption
          onClick={() => history.push('/tokens')}
          Icon={<Staking width={25} height={25} />}
          text="detailPage.menu.staking"
        />
      </div>

    </div>
  );
};


export default LateralMenu;
