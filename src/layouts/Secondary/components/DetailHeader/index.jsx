import {ReactComponent as LogoBurger} from 'assets/svg/icon-burger.svg';
import {ReactComponent as LogoSvgHeader} from 'assets/svg/canasta-logo-yellow.svg';
import BaseSearch from 'components/BaseSearch';
import Menu from './Menu';
import { useHistory } from 'react-router-dom';

import styles from './detailHeader.module.scss';
import BaseChangeLanguage from 'components/BaseChangeLanguage';

const style = {
  bmBurgerButton: {
    position: 'absolute',
    width: '36px',
    height: '3rem',
    right: '2rem',
    top: '1rem'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.1)'
  }
};


const options = [
  {
    value: 'es',
    label: 'ESP'
  },
  {
    value: 'en',
    label: 'ENG'
  }
];


const DetailHeader = () => {
  const history = useHistory();
  return(
    <div className={styles.main}>
      <div className={`${styles.header}`}>
        <div className={styles.header__menu}>
          <LogoSvgHeader
            style={{width: 200, cursor: 'pointer'}}
            onClick={()=> history.push('/')}
          />
          <div className={styles.menu}>
            <Menu />
          </div>
        </div>
   
        <div className={`${styles.header__search} `}>
          <div className={styles.searchComponent}>
            <BaseSearch />
          </div>
          <div className={styles.main__language}><BaseChangeLanguage options={options} /></div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
