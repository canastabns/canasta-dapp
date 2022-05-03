import BaseChangeLanguage from 'components/BaseChangeLanguage';
import BaseButton from 'components/BaseButton';
import * as i18nActions from 'redux/actions/i18nActions';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as WalletSelects from 'redux/selectors/walletSelector';
import BaseConnect from 'components/BaseConnect';

function Header() {
  const dispatch = useDispatch();
  const wallet = useSelector(state => WalletSelects.getWalletState(state));
  const changeLanguage = e => dispatch(i18nActions.setLocale(e));

  const menu = [
    { title: 'Home', url: '/'},
    { title: 'Buy Tokens', url: '/tokens'},
    { title: 'My Domains', url: `/domains/${wallet.address}`},
    { title: 'Favourites', url: '/favourites'},
    { title: 'Staking', url: '/tokens'}
  ];
  return (
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

   
      <div className={`${styles.menu__desktop}`}>
        <BaseButton
          text={'global.buyToken'}
          className={styles.primaryButton}
          onClick={() => window.location.href = 'https://app.canasta.domains/tokens' }
        />
            
        <BaseChangeLanguage />
      </div>



    </header>
  );
}

export default Header;
