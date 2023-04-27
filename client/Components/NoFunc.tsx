import React from 'react';
import { NoFuncProps } from '../types';

function NoFunc(props: NoFuncProps) {
  const { nofunc } = props;
  if (!nofunc) {
    return null;
  }
  return <p>You have no functions!</p>;
}

export default NoFunc;
