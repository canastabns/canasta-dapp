import {ReactComponent as LogoBNB} from 'assets/svg/icon-bnb.svg';
import {Translate} from 'react-redux-i18n';

import styles from './boxOne.module.scss';

function BoxOne() {
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <LogoBNB width={120}/>
        <div className={styles.textTitle} >
          <Translate value={'homeScreen.boxOne.title'} />
        </div>
      </div>
      <div className={styles.content}>
        <Translate value={'homeScreen.boxOne.content'} />
      </div>
      <div className={styles.footer}>
        <div
          className={styles.button}
          onClick={() => window.open('https://blog.canasta.domains/', '_blank') }
        >
          <Translate value={'homeScreen.boxOne.learnMore'} />
        </div>
      </div>
    </div>
  );
}

export default BoxOne;
