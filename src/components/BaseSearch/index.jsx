import {useEffect, useState} from 'react';

import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import * as ensSelector from 'redux/selectors/ensSelector';

import DefaultVersionContainer from './DefaultVersion';
import HeaderVersionContainer from './HeaderVersion';
import { useLocation } from 'react-router-dom';

const BaseSearchComponent = (props) => {

  const [inputValue, setInputValue] = useState(''),
    [disabledButton, setDisabledButton] = useState(true);
  const searchState = useSelector(state => ensSelector.getSearchDomain(state));
  const search = useLocation().pathname.trim().split('/').filter(Boolean);

  const getSearchParam = () => {
    if(search.includes('search')){
      return search[1];
    } else {
      return searchState.data.domain;
    }
  };


  const inputHandler = e => {
    const value = e.target.value;
    if(value.length > 2) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    setInputValue(value);
  };

  const buttonHandler = () => window.location.href = `/search/${inputValue || getSearchParam()}`;
    
  const inputKeyUpEnter = e => {
    if (!disabledButton && (e.key === 'Enter' || e.keyCode === 13))
      buttonHandler();
  };

  return (
    <>
      {props.type === 'default' && (
        <DefaultVersionContainer
          {...props}
          inputValue={inputValue || searchState.data.domain}
          inputHandler={inputHandler}
          disabledButton={disabledButton}
          buttonHandler={buttonHandler}
          inputKeyUpEnter={inputKeyUpEnter}
        />
      )}

      {props.type === 'header' && (
        <HeaderVersionContainer
          {...props}
          inputValue={inputValue || searchState.data.domain}
          inputHandler={inputHandler}
          disabledButton={disabledButton}
          buttonHandler={buttonHandler}
          inputKeyUpEnter={inputKeyUpEnter}
        />
      )}
    </>
  );
};

BaseSearchComponent.propTypes = {
  type: PropTypes.oneOf(['default', 'header'])
};

BaseSearchComponent.defaultProps = {
  type: 'default'
};

export default BaseSearchComponent;
