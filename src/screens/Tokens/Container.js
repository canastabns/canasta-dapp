import { Tabs } from 'antd';
import SecondaryLayout from 'layouts/Secondary';
import { useState } from 'react';
import {Translate} from 'react-redux-i18n';

import BuyToken from './components/BuyToken';
import StakingToken from './components/StakingToken';
import styles from './styles.module.scss';

const { TabPane } = Tabs;

const _BuyToken = ()=> {

  const [tabActive, setTabActive] = useState(1);

  function callback(key) {
    // console.log(key);
  }

  return (
    <SecondaryLayout>

      <div className={styles.tabs}>
        <div className={styles.tab__header}>
          <div onClick={()=> setTabActive(1)} className={`${styles.tab__title} ${tabActive === 1 && styles.tab__title_active}`}>
            <Translate value={'tokens.tab.buyToken'} />
          </div>
          <div onClick={()=> setTabActive(2)} className={`${styles.tab__title} ${tabActive === 2 && styles.tab__title_active}`}>
            <Translate value={'tokens.tab.stakingToken'} />
          </div>
        </div>

        <div className={styles.tab}>
          <div className={`${styles.tab__content} ${tabActive === 2 && styles.tab__hidden}`}>
            <BuyToken />
          </div>
          <div className={`${styles.tab__content} ${tabActive === 1 && styles.tab__hidden}`}>
            <StakingToken />
          </div>
        </div>
      </div>
    </SecondaryLayout>
  );
};


export default _BuyToken;
