import {ReactComponent as YellowHeartIcon} from 'assets/svg/icon-yellow-heart.svg';
import BaseChangeLanguage from 'components/BaseChangeLanguage';
import BaseConnect from 'components/BaseConnect';
import BaseLateralOption from 'components/BaseLateralOption';

import styles from './styles.module.scss';

const LateralMenu = () => {

  return(
    <div className={styles.container}>
      <div className={styles.lateralMenuOption}>
        <BaseChangeLanguage />
      </div>

      {/*
      <div className={'d-flex flex-column mt-3 mb-3 pl-3'}>
        <span>Main Red</span>
        <span>(Read Only)</span>
      </div>
      */}

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
    </div>
  );
};


export default LateralMenu;
