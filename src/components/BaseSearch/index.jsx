import {useState} from 'react';

import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as ensSelector from 'redux/selectors/ensSelector';

import DefaultVersionContainer from './DefaultVersion';
import HeaderVersionContainer from './HeaderVersion';

const BaseSearchComponent = (props) => {
  const history = useHistory();

  const searchState = useSelector(state => ensSelector.getSearchDomain(state));

  const [inputValue, setInputValue] = useState(''),
    [disabledButton, setDisabledButton] = useState(true);


  const inputHandler = e => {
      const value = e.target.value;
      if(value.length > 2) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }

      setInputValue(value);
    },
    buttonHandler = () => window.location.href = `/search/${inputValue}`,
    inputKeyUpEnter = e => {
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
          inputValue={inputValue}
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
