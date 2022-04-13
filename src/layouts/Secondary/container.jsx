import BaseLayout from 'layouts/BaseLayout';

import DetailFooter from './components/DetailFooter';
import DetailHeader from './components/DetailHeader';
import styles from './secondary.module.scss';

const Details = (props) => {
  return(
    <BaseLayout>
      <div className={styles.main}>
        <DetailHeader />

        <div className={styles.content}>
          {props.children}
        </div>

        <DetailFooter />
      </div>
    </BaseLayout>
  );
};

export default Details;
