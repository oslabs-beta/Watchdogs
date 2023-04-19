// React Imports
import React from 'react';
import Chart from './Chart';
import { jsPDF } from 'jspdf'


// Type Imports
import { FunctionProps, ErrorData , ErrorBodyType} from '../types';
//region, arn, function name
// Main Function
function Function(props: FunctionProps) {
  // Destructure Props
  const { functionData, functionName, user } = props;


  const generatePDF = (): void => {
    fetch ('/api/error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: user.region,
        arn: user.arn,
        func: functionName
      } as ErrorBodyType),
    })
    .then((res): Promise<ErrorData[]> => res.json())
    .then((res) => {
      const doc = new jsPDF();
      const output = res.map(error => doc.splitTextToSize(`${error.message}: ${error.timestamp}`, 50))
      // res.forEach((el) => {
        
      //   const split = doc.splitTextToSize(`${el.message} ${el.timestamp}`, 50)
      //   output.push(split)
      // })
      // const errors: string[]
      // const log: string = doc.splitTextToSize(errors, 50)
      console.log(output)
      doc.text(output, 10, 10)     

      doc.save(`${functionName}ErrorLogs.pdf`)
    })
  }
  // Render Component
  return (
    <>
      <div className="function">
        <h2>&quot;{functionName}&quot;</h2>
        <button onClick={() => generatePDF()}>Generate Error Logs</button>
        <Chart key={functionName} data={functionData} />
      </div>
    </>
  );
}

export default Function;
