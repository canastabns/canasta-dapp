import {useDispatch, useSelector} from 'react-redux';
import * as i18nActions from 'redux/actions/i18nActions';
import * as i18nSelectors from 'redux/selectors/i18nSelector';

import styles from './baseSelect.module.scss';


const BaseChangeLanguage = (props) => {
  const dispatch = useDispatch(),
    currentLocale = useSelector(state => i18nSelectors.getLocale(state));

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
  

  const languages = props.options || options;

  const changeLanguage = e => dispatch(i18nActions.setLocale(e.target.value));
 
  return(
    <div className={styles.containerSelect}>
      <select
        className={styles.selectButton}
        onChange={changeLanguage}
        value={currentLocale}
      >
        {languages && languages.map((row, index) =>
          <option key={`option-${index}`} value={row.value}>{row.label}</option>)}
      </select>
    </div>
  );
};

export default BaseChangeLanguage;
