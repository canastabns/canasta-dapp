import { useState, useEffect } from 'react';

import {ReactComponent as IconNotify} from 'assets/svg/icon-notify.svg';
import {Translate} from 'react-redux-i18n';

import styles from './subDomainStyle.module.scss';

const SubDomainModule = () => {
  
  return(
    <>
      <div className={styles.subBody}>
        SubDomainModule
      </div>
    </>
  );
};

export default SubDomainModule;