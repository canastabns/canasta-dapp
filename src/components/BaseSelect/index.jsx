import styles from './baseSelect.module.scss';

const BaseSelect = (props) => {
  return(
    <div className={styles.containerSelect}>
      <select
        className={styles.selectButton}
        onChange={props.onChange}
        value={props.defaultValue}
      >
        {props.options && props.options.map((row, index) =>
          <option key={`option-${index}`} value={row.value}>{row.label}</option>)}
      </select>
    </div>
  );
};

export default BaseSelect;
