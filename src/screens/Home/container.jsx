import SearchInput from 'components/BaseSearch';
import MainLayout from 'layouts/MainLayout';

import {BoxOne, BoxTwo} from './components/boxes';
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
          <div className={`${styles.aboutBoxContainer} ${styles.orange} ${styles.border__top_left}`}>
            <BoxOne/>
          </div>

          <div className={`${styles.aboutBoxContainer} ${styles.orange} ${styles.border__top_right}`}>
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
