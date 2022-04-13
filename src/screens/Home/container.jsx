import SearchInput from 'components/BaseSearch';
import MainLayout from 'layouts/main';

import {BoxOne, BoxTwo, BoxThree, BoxFour} from './components/boxes';
import styles from './style.module.scss';

const SearchContent = () =>  (
  <div className={styles.searchContainer}>
    <SearchInput />
  </div>
);
function Container(props) {
  return (
    <MainLayout>
      {props.isLoading && 'Loading...'}
      <SearchContent />
      <div className={styles.body}>
        <div className={styles.aboutContent}>
          <div className={`${styles.aboutBoxContainer} ${styles.orange}`}>
            <BoxOne/>
          </div>

          <div className={`${styles.aboutBoxContainer} ${styles.orange}`}>
            <BoxTwo/>
          </div>
        </div>
      </div>

    </MainLayout>
  );
}


Container.defaultProps = {
  isLoading: false,
  domain: ''
};

export default Container;
