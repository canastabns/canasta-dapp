import { ReactComponent as Doc } from 'assets/svg/icon-doc.svg';
import BaseButton from 'components/BaseButton';

import styles from './detailStyle.module.scss';

const OwnerInformationRowContainer = props => (
  <div className={styles.ownerInformationContainer}>
    <div className={styles.ownerTitleContainer}>
      {props.title}
    </div>

    {props.editable ? (
      <div className={styles.ownerInformationValueContainer}>
        <input
          value={props.inputValue || props.value}
          onChange={props.inputHandler}
          type="text"
          name="address"
          className="form-control"
          placeholder="Enter binance name or address"
          aria-label="address"
        />
      </div>
    ): (
      <div className={styles.ownerInformationValueContainer}>
        {props.link && (
          <a href={props.link} target={'_blank'} rel="noreferrer">{props.value}</a>
        )}

        {!props.link && props.value}

        {props.activeCopy && (
          <div className={styles.copyContainer}>
            {(!props.copySuccess) && (
              <Doc
                className={styles.buttonCopy}
                width={20}
                height={20}
                onClick={() => props.copyHandler(props.value)}
              />

            )}
            {props.copySuccess && (<div className={styles.copySuccess}>Copy Success!!</div>) }
          </div>
        )}
      </div>
    )}

    <div className={styles.ownerActionContainer}>
      {props.actionOnClick && (
        <BaseButton
          onClick={props.actionOnClick}
          text={props.actionText}
          isLoading={props.isLoading}
        />
      )}
    </div>
  </div>
);

export default OwnerInformationRowContainer;
