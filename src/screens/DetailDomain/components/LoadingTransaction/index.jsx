import { useState, useEffect } from 'react';

import {Progress} from 'antd';
import 'antd/dist/antd.css';

const LoadingTransaction = (props) => {
  const [prog, setProgress] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Cantidad de Render');
      setProgress((prevProgress) => (prevProgress >= 60 ? kill() : prevProgress + 2));
    }, 1000);

    const kill = () => {
      clearInterval(timer);
      setProgress(100);
    };
    return () => clearInterval(timer);
  
  }, []);

  return (
    <div>
      <Progress type="circle" percent={prog} strokeWidth={5} strokeColor={'#292929'} format={() => '1'}  />
      <Progress percent={prog} status="active" />
    </div>
  );
};

export default LoadingTransaction;
