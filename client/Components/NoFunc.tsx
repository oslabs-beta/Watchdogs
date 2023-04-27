import React from 'react';
import { NoFuncProps } from '../types';

function NoFunc(props: NoFuncProps) {
  const { nofunc } = props;
  
  if (!nofunc) {
    return null;
  }
  return (
    <div id="nofunc">
      <p>You have no functions!</p>
    </div>
  );
}

export default NoFunc;
