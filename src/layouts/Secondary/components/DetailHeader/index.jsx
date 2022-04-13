import {ReactComponent as LogoBurger} from 'assets/svg/icon-burger.svg';
import {ReactComponent as LogoSvgHeader} from 'assets/svg/logo-canasta.svg';
import BaseSearch from 'components/BaseSearch';
import { slide as Menu } from 'react-burger-menu';
import { useHistory } from 'react-router-dom';

import styles from './detailHeader.module.scss';

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

const DetailHeader = () => {
  const history = useHistory();
  return(
    <div className={styles.main}>
      <div className={`${styles.headerContainer}`}>
        <div  className={styles.iconBurger}>
          <Menu
            right
            styles={style}
            className={styles.myMenu}
            customBurgerIcon={ <LogoBurger /> }
          >
            <a id="home" className="menu-item" href="/">Home</a>
          </Menu>
        </div>
        <div className={'col-3'}>
          <LogoSvgHeader
            style={{width: 200, cursor: 'pointer'}}
            onClick={()=> history.push('/')}
          />
        </div>
        <div className={`col-9 ${styles.searchHeader} `}>
          <div className={styles.searchComponent}>
            <BaseSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
