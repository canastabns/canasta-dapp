import {ReactComponent as IconConfig} from 'assets/svg/icon-config.svg';
import {ReactComponent as IconDni} from 'assets/svg/icon-dni.svg';
import {ReactComponent as IconSave} from 'assets/svg/icon-save.svg';
import {ReactComponent as IconSearch} from 'assets/svg/icon-search.svg';

import styles from './boxThree.module.scss';
function BoxThree() {
  return (
    <div className={styles.body}>
      <div className={styles.box}>
        <IconSearch width={100}/>
        <div className={styles.textTitle} >
            Búsqueda de nombre
        </div>
      </div>

      <div className={styles.box}>
        <IconSave width={100}/>
        <div className={styles.textTitle} >
           Guarda tus nombres favoritos
        </div>
      </div>

      <div className={styles.box}>
        <IconDni width={100}/>
        <div className={styles.textTitle} >
            Registra nombres
        </div>
      </div>

      <div className={styles.box}>
        <IconConfig width={100}/>
        <div className={styles.textTitle} >
            Gestiona nombres
        </div>
      </div>

    </div>
  );
}

export default BoxThree;
