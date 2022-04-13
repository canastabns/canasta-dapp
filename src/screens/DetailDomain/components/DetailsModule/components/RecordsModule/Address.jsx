import { useState , useRef } from 'react';

import {ReactComponent as IconPencil} from 'assets/svg/icon-pencil.svg';
import BaseButton from 'components/BaseButton';
import PropTypes from 'prop-types';

import styles from './recordModuleStyle.module.scss';



const AddressModule = (props) => {
  const inputAddress = useRef();
  const [tempAddress, setTempAddress] = useState('');

  const [isEditAddress, setIsEditAddress] = useState(false);

  const [addressAdded, setAddressAdded] = useState(null);

  const handleAddRecord = () => {
    setIsEditAddress(true);
  };

  const handleRemoveRecord = () => {
    setIsEditAddress(false);
  };

  const handleRecordAddress = () => {
    setAddressAdded(tempAddress);
    setIsEditAddress(false);
  };
  return (

    <div className={styles.address}>
      <div className={`${styles.fontSubTitle}`}>
        <div>Address</div>
        {!addressAdded && (isEditAddress
          ? (<div className={`${styles.iconMore}`} onClick={handleRemoveRecord}>-</div>)
          : (<div className={`${styles.iconMore}`} onClick={handleAddRecord}>+</div>)
        )}
      </div>

      <div className={styles.addressDetail}>
        <div className={styles.typeAddress}>BNB</div>
        {isEditAddress
          ? (
            <div className={styles.inputAddress}>
              <input ref={inputAddress} value={tempAddress} onChange={(v)=>setTempAddress(v.target.value)} type="text" name="address" className="form-control" placeholder="Enter ethereum name or address" aria-label="name" />
              <BaseButton text='save' onClick={handleRecordAddress} className={styles.buttonAddress} />
            </div>
          )
          :(
            <div className={styles.theAddress}>
              <div>{addressAdded}</div>
              {addressAdded
                  && (<div><IconPencil width={20} onClick={()=>setIsEditAddress(true)} /></div>)
              }
            </div>
          )
        }
      </div>
    </div>

  );
};

AddressModule.propTypes = {
};
AddressModule.defaultProps = {
};
export default AddressModule;
