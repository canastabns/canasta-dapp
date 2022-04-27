import BaseChangeLanguage from 'components/BaseChangeLanguage';
import BaseButton from 'components/BaseButton';
import * as i18nActions from 'redux/actions/i18nActions';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const changeLanguage = e => dispatch(i18nActions.setLocale(e));
  return (
    <header className={`${styles.header}`}>
      <input className={styles.menu__btn} type="checkbox" id="menu__btn" />
      <label className={styles.menu__icon} htmlFor="menu__btn">
        <span className={styles.navicon} />
      </label>

      
      <ul className={`${styles.menu}`}>
        <li><Link to={'/tokens'}>Buy Token</Link></li>
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
