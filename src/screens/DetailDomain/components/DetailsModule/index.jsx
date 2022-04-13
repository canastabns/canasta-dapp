import {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import * as ensActions from 'redux/actions/ensActions';
import * as ensSelector from 'redux/selectors/ensSelector';

import DetailsModuleContainer from './container';

const Details = () => {
  const dispatch = useDispatch();

  const [editableAddress, setEditableAddress] = useState(false),
    [newAddress, setNewAddress] = useState(null),
    [editableOwner, setEditableOwner] = useState(false),
    [newOwner, setNewOwner] = useState(null);

  const searchData = useSelector(state => ensSelector.getSearchDomain(state)),
    changeAddressState = useSelector(state => ensSelector.changeAddress(state)),
    transferToState = useSelector(state => ensSelector.transferTo(state)),
    renewState = useSelector(state => ensSelector.renew(state));

  const registrantAddress = searchData.data.available ? '0x0' : searchData.data.ownerOf,
    controllerAddress = searchData.data.available ? 'Not owned' : searchData.data.ownerOf,
    expireDate = searchData.data.nameExpires && searchData.data.nameExpires.toString(),
    address = searchData.data.address && searchData.data.address,
    isOwner = searchData.data.isOwner && searchData.data.isOwner;

  const changeAddressIsLoading = (changeAddressState.begin && !changeAddressState.success),
    transferToIsLoading = (transferToState.begin && !transferToState.success),
    renewIsLoading = (renewState.begin && !renewState.success);

  useEffect(() => {
    if(changeAddressState.success)
      setEditableAddress(!editableAddress);

    if(transferToState.success)
      setEditableOwner(!editableOwner);
  }, [
    changeAddressState.success,
    transferToState.success
  ]);

  const setAddressHandler = () => {
      if(!editableAddress){
        setEditableAddress(!editableAddress);
      } else {
        if(newAddress)
          dispatch(ensActions.changeAddress(newAddress));
      }
    },
    newAddressInputHandler = (e) => setNewAddress(e.target.value),
    setOwnerHandler = () => {
      if(!editableOwner){
        setEditableOwner(!editableOwner);
      } else {
        if(newOwner)
          dispatch(ensActions.transferTo(newOwner));
      }
    },
    newOwnerInputHandler = (e) => setNewOwner(e.target.value),
    renewHandler = () => dispatch(ensActions.renew());

  return(
    <DetailsModuleContainer
      isOwner={isOwner}
      registrantAddress={registrantAddress}
      controllerAddress={controllerAddress}
      expireDate={expireDate}
      address={address}

      editableAddress={editableAddress}
      editableOwner={editableOwner}

      setAddress={setAddressHandler}
      setOwnerHandler={setOwnerHandler}
      renewHandler={renewHandler}

      newAddressInputHandler={newAddressInputHandler}
      newOwnerInputHandler={newOwnerInputHandler}

      changeAddressIsLoading={changeAddressIsLoading}
      transferToIsLoading={transferToIsLoading}
      renewIsLoading={renewIsLoading}

      newAddress={newAddress}
      newOwner={newOwner}
    />
  );
};

export default Details;
