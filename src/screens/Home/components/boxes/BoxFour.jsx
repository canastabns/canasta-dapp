import {ReactComponent as LogoEth} from 'assets/svg/icon-ens.svg';

import styles from './boxOne.module.scss';

function BoxFour() {
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <LogoEth width={120}/>
        <div className={styles.textTitle} >
            Como utilizar ENS
        </div>
      </div>
      <div className={styles.content}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita iste ullam animi? Quisquam quas cumque laborum iure fugit id omnis corrupti debitis, quam ducimus, rerum reiciendis inventore recusandae aut doloribus?
      </div>
      <div className={styles.footer}>
        <div className={styles.button}>
              Aprender más
        </div>
      </div>
    </div>
  );
}

export default BoxFour;
