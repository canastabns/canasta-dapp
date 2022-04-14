import {ReactComponent as CommentIcon} from 'assets/svg/icon-comment.svg';
import {ReactComponent as YellowHeartIcon} from 'assets/svg/icon-yellow-heart.svg';
import {ReactComponent as Staking} from 'assets/svg/staking.svg';
import BaseChangeLanguage from 'components/BaseChangeLanguage';
import BaseConnect from 'components/BaseConnect';
import BaseLateralOption from 'components/BaseLateralOption';
import {useHistory} from 'react-router-dom';

import styles from './styles.module.scss';

const LateralMenu = () => {
  const history = useHistory();
  return(
    <div className={styles.container}>
      {/*
      <div className={styles.lateralMenuOption}>
        <span>Main Red</span>
        <span>(Read Only)</span>
      </div>
      */}

      <br />
      <div className={styles.lateralMenuOption}>
        <BaseChangeLanguage />
      </div>

      <div className={styles.lateralMenuOption}>
        <BaseConnect />
      </div>

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
