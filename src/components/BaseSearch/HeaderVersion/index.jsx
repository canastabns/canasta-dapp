import {Translate, I18n} from 'react-redux-i18n';

import styles from './baseSearch.module.scss';

function HeaderVersion(props) {
  return (

    <div
      className={styles.searchFormContainer}
    >
      <input
        className={styles.searchInput}
        placeholder={I18n.t('baseSearchComponent.searchPlaceHolder')}
        onChange={props.inputHandler}
        defaultValue={props.inputValue}
        onKeyUp={props.inputKeyUpEnter}
      />
      <button
        className={styles.searchButton}
        disabled=""
        type="submit"
        onClick={props.buttonHandler}
      >
        <Translate value="baseSearchComponent.searchButton" />
      </button>
    </div>

  );
}

export default HeaderVersion;
