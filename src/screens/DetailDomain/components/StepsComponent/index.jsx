
import { useEffect, useState } from 'react';

import {Progress} from 'antd';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {Translate} from 'react-redux-i18n';
import * as ensSelectors from 'redux/selectors/ensSelector';

import 'antd/dist/antd.css';
import styles from './stepsStyles.module.scss';

const StepsComponent = (props) => {
  const [secundaryProgress, setSecundaryProgress] = useState(0);
  const [primaryProgress, setPrimaryProgress] = useState(0);
  const [terciaryProgress, setTerciaryrogress] = useState(0);

  useEffect(()=>{
    setPrimaryProgress(props.progress);
    if(props.progress > 50){
      setSecundaryProgress(secundaryProgress + 5);
      setPrimaryProgress(100);
    }
    if(props.progress > 80){
      setSecundaryProgress(100);
    }
  }, [props.progress]);

  const updatePercentage = (step) => {
    const percen = {
      1: primaryProgress,
      2: secundaryProgress,
      3: terciaryProgress
    };
    return percen[step];
  };

  return (
    <div className={styles.step}>
      {props.steps.map((step) => {
        return (<div key={step} className={styles.stepSubBody}>
          <div className={styles.bodyEnum}>
            <Progress type="circle"
              percent={props.isLoading ? updatePercentage(step) : 100}
              strokeWidth={5}
              width={25}
              strokeColor={ props.isLoading ? 'green' : '#282828' }
              format={() => step}  />
          </div>
          <div className={styles.stepBody}>
            <div className={styles.titleEnum}>
              <Translate value={`detailPage.stepsRegister.step${step}.title`}/>
            </div>
            <div className={styles.stepDetail}>
              <Translate value={`detailPage.stepsRegister.step${step}.description`}/>
            </div>
          </div>
        </div>);
      })}
    </div>

  );
};

StepsComponent.propTypes = {
  steps: PropTypes.array,
  isLoading: PropTypes.bool,
  progress: PropTypes.number
};

StepsComponent.defaultProps = {
  steps: [],
  isLoading: false,
  progress: 0
};

export default StepsComponent;
