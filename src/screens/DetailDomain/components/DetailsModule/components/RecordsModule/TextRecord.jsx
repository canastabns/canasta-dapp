import { useState , useRef } from 'react';

import {ReactComponent as IconCancel} from 'assets/svg/icon-cancel.svg';
import {ReactComponent as IconSave} from 'assets/svg/icon-disk.svg';
import PropTypes from 'prop-types';

import styles from './recordModuleStyle.module.scss';

const TextRecord = (props) => {
  const selectRef = useRef();
  const inputRef = useRef();

  const [records, setRecords] = useState([]);
  const [isEditAddress, setIsEditAddress] = useState(false);

  const handleAddRecord = () => {
    setIsEditAddress(true);
  };

  const handleClose = () => {
    setIsEditAddress(false);
  };

  const handleSave = () => {
    if(inputRef.current.value !==''){
      const record = {
        type: selectRef.current.value,
        value: inputRef.current.value
      };
      setRecords([...records, record]);
      setIsEditAddress(false);
    }
  };

  return (
    <div className={styles.address}>
      <div className={`${styles.fontSubTitle}`}>
        <div>Text Record</div>
        {isEditAddress
          ? (<div className={`${styles.iconMore}`} onClick={handleClose}>-</div>)
          : (<div className={`${styles.iconMore}`} onClick={handleAddRecord}>+</div>)
        }
      </div>

      {records.map((record, key) => {
        return(
          <div className={styles.addressDetail} key={key}>
            <div className={styles.typeAddress}>{record.type}</div>
            <div className={styles.theAddress}>
              <div>{record.value}</div>
            </div>
          </div>
        );
      })}

      {isEditAddress && (
        <div className={styles.addressDetail}>
          <div  className={'row p-2 w-100 '}>
            <div className="col col-12 col-lg-4">
              <select name="type" defaultValue="0" ref={selectRef} className="form-select" >
                <option value="0">Select a Record</option>
                <option value="address">ADDRESS</option>
                <option value="other address">OTHER ADDRESSES</option>
                <option value="content">CONTENT</option>
                <option value="text">TEXT</option>
              </select>
            </div>
            <div className="col col-12 col-lg-8">
              <div className="row">
                <div className='col-xs-12 col-md-10'>
                  <input type="text" name="address" ref={inputRef} className="form-control" placeholder="Enter ethereum name or address" aria-label="name" />
                </div>
                <div className='col-xs-12 col-md-2 d-flex justify-content-end align-content-center'>
                  <IconSave width={25} height={25} className='cursor-pointer me-2'  onClick={handleSave} />
                  <IconCancel  width={25} height={25} className='cursor-pointer' onClick={handleClose} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

TextRecord.propTypes = {
};
TextRecord.defaultProps = {
};
export default TextRecord;
