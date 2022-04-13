import {Translate, I18n} from 'react-redux-i18n';

import styles from './style.module.scss';

function DefaultVersionContainer(props) {
  return (
    <div className={styles.searchFormContainer}>
      <input
        className={styles.searchInput}
        placeholder={I18n.t('homeSearchInput.placeHolder')}
        onChange={props.inputHandler}
        defaultValue={props.inputValue}
        onKeyUp={props.inputKeyUpEnter}
      />
      <button
        className={styles.searchButton}
        disabled={props.disabledButton}
        type="submit"
        onClick={props.buttonHandler}
      >
        <Translate value="homeSearchInput.search" />
      </button>
    </div>

  );
}
export default DefaultVersionContainer;
