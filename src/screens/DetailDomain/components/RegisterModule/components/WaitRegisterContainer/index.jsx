import { useState, useEffect } from 'react';

import {Progress} from 'antd';
import BaseButton from 'components/BaseButton';
import PropTypes from 'prop-types';
import {Translate} from 'react-redux-i18n';
import StepsComponent from 'screens/DetailDomain/components/StepsComponent';

import 'antd/dist/antd.css';
import styles from './styles.module.scss';

const WaitRegisterContainer = (props) => {
  const disabledButtonRegister = (
    !props.commitSuccess
    || props.registerBegin
    || props.registerSuccess
  );

  const [prog, setProgress] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? kill() : prevProgress + 1));
    }, 650);

    const kill = () => {
      clearInterval(timer);
      setProgress(100);
    };
    return () => clearInterval(timer);

  }, []);
  return (
    <>
      <div className={styles.subBody}>
        <Progress percent={prog} strokeWidth={20} status="active" />
      </div>
      <StepsComponent steps={props.steps} isLoading={true} progress={prog} />
      <div className='d-flex justify-content-end'>
        <BaseButton
          onClick={props.register}
          disabled={(prog !== 100 || disabledButtonRegister)}
          isLoading={props.registerBegin}
          text={'detailPage.registerModule.requestRegistration'}
        />
      </div>
    </>
  );
};

WaitRegisterContainer.propTypes = {
  register: PropTypes.func,
  commitSuccess: PropTypes.bool,
  registerBegin: PropTypes.bool,
  registerSuccess: PropTypes.bool
};

WaitRegisterContainer.defaultProps = {
  register: () => {},
  commitSuccess: false,
  registerBegin: false,
  registerSuccess: false
};

export default WaitRegisterContainer;
