import {Link} from 'react-router-dom';
import styles from './menu.module.scss';
import { useSelector} from 'react-redux';
import * as WalletSelects from 'redux/selectors/walletSelector';
import BaseConnect from 'components/BaseConnect';

const Menu = ()=> {
  const wallet = useSelector(state => WalletSelects.getWalletState(state));

  const menu = [
    { title: 'Home', url: '/'},
    { title: 'My Domains', url: `/domains/${wallet.address}`},
    { title: 'Favourites', url: '/favourites'},
    { title: 'Staking', url: '/tokens'}
  ];

  return(
    <header className={`${styles.header}`}>
      <input className={styles.menu__btn} type="checkbox" id="menu__btn" />
      <label className={styles.menu__icon} htmlFor="menu__btn">
        <span className={styles.navicon} />
      </label>

    
      <ul className={`${styles.menu}`}>
        {menu && menu.map((value, key) => {
          return(
            <li key={key}><Link to={value.url}>{value.title}</Link></li>
          );
        })}
        <li> <a href=""> <BaseConnect isButton={false} /> </a></li>
        <li><a href=""> <span onClick={()=>changeLanguage('es')}>Esp</span> | <span onClick={()=>changeLanguage('en')}>Eng</span></a></li>
      </ul>

    </header>
  );
};

export default Menu;