import AddressModule from './Address';
import styles from './recordModuleStyle.module.scss';
import TextRecord from './TextRecord';

const RecordModule = (props) => {
  return (
    <div className={` ${styles.recordContainer}`}>
      <div className={`${styles.titleRecord}`}>
        <div className={styles.fontTitle}>Address</div>
      </div>

      <AddressModule />

      {/* <TextRecord /> */}
    </div>
  );
};

RecordModule.propTypes = {
};
RecordModule.defaultProps = {
};
export default RecordModule;
