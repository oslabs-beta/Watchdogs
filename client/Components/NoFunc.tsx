import React from 'react';
import { NoFuncProps } from '../types';

function NoFunc(props: NoFuncProps) {
  const { nofunc } = props;
  // const functionsList = document.getElementById(
  //   'functions-list'
  // ) as HTMLDivElement;
  if (!nofunc) {
    // functionsList.style.display = 'none';
    return null;
  }
  return (
    <div id="nofunc">
      <p>You have no functions!</p>
    </div>
  );
}

export default NoFunc;
