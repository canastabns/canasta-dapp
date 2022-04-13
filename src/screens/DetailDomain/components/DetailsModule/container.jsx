import OwnerInformationRow from './components/OwnerInformationRow';
import styles from './detailStyle.module.scss';

const DetailsModuleContainer = (props) => {

  return(
    <div className={styles.mainContainer}>
      <OwnerInformationRow
        title={'PARENT'}
        value={'bnb'}
      />

      <OwnerInformationRow
        title={'REGISTRANT'}
        value={props.registrantAddress}
        link={`${process.env.REACT_APP_URL_SCAN}/address/${props.controllerAddress}`}
        activeCopy={true}

        actionOnClick={props.isOwner && props.setOwnerHandler}
        actionText={props.editableOwner ? 'SAVE': 'TRANSFER'}
        editable={props.isOwner && props.editableOwner}
        isLoading={props.transferToIsLoading}
        inputHandler={props.newOwnerInputHandler}
        inputValue={props.newOwner}
      />

      <OwnerInformationRow
        title={'ADDRESS'}
        value={props.address}
        link={`${process.env.REACT_APP_URL_SCAN}/address/${props.address}`}
        activeCopy={true}
        actionOnClick={props.isOwner && props.setAddress}
        actionText={props.editableAddress ? 'SAVE': 'SET'}
        editable={props.isOwner && props.editableAddress}
        isLoading={props.changeAddressIsLoading}
        inputHandler={props.newAddressInputHandler}
        inputValue={props.newAddress}
      />

      {props.expireDate && (
        <OwnerInformationRow
          title={'EXPIRATION DATE'}
          value={props.expireDate}
          actionOnClick={props.isOwner && props.renewHandler}
          actionText={'RENEW'}
          isLoading={props.renewIsLoading}
        />
      )}
    </div>
  );
};

export default DetailsModuleContainer;
