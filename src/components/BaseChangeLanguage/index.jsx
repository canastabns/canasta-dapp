import {useDispatch, useSelector} from 'react-redux';
import * as i18nActions from 'redux/actions/i18nActions';
import * as i18nSelectors from 'redux/selectors/i18nSelector';

import styles from './baseSelect.module.scss';


const BaseChangeLanguage = () => {
  const dispatch = useDispatch(),
    currentLocale = useSelector(state => i18nSelectors.getLocale(state));

  const changeLanguage = e => dispatch(i18nActions.setLocale(e.target.value));
  const options = [
    {
      value: 'es',
      label: 'Español'
    },
    {
      value: 'en',
      label: 'English'
    }
  ];

  return(
    <div className={styles.containerSelect}>
      <select
        className={styles.selectButton}
        onChange={changeLanguage}
        value={currentLocale}
      >
        {options && options.map((row, index) =>
          <option key={`option-${index}`} value={row.value}>{row.label}</option>)}
      </select>
    </div>
  );
};

export default BaseChangeLanguage;
