import { useState , useRef } from 'react';

import { ReactComponent as Doc } from 'assets/svg/icon-doc.svg';
import BaseFavouriteHeart from 'components/BaseFavouriteHeart';

import styles from './DomainName.module.scss';

const DomainName = ({ domainLabel }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(domainLabel);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  return(
    <div className={`${styles.domainName} pill bg-lightPrimary`}>
      <div>
        {domainLabel}
        {copySuccess &&  (<div className={styles.copySuccess}>Copy Success!!</div>) }
        <Doc
          className={styles.buttonCopy}
          width={20}
          height={20}
          onClick={copyLink}
        />
      </div>
     
    </div>
  );
};


export default DomainName;
