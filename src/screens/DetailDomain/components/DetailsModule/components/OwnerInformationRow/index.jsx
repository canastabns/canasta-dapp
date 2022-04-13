import {useRef, useState} from 'react';

import OwnerInformationRowContainer from './container';

const OwnerInformationRow = (props) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyHandler = async text => {
    await navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  return(
    <OwnerInformationRowContainer
      {...props}
      copyHandler={copyHandler}
      copySuccess={copySuccess}
      activeCopy={!!props.activeCopy}
    />
  );
};

export default OwnerInformationRow;
