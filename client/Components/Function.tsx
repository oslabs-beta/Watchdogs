// React Imports
import React from 'react';
import Chart from './Chart';
import { jsPDF } from 'jspdf';
import { useState, useEffect } from 'react'

// Type Imports
import { FunctionProps, ErrorData , ErrorBodyType} from '../types';


// Main Function
function Function(props: FunctionProps) {
  // Destructure Props
  const { functionData, functionName, user } = props;
  //change function border to red if there are errors
  useEffect(() => {
    if (Math.max(...functionData.Errors.values)) {
        const errorFunc = document.getElementById(functionName);
        if ( errorFunc){
          errorFunc.style.border = 'solid 1px red'
        }
    }
  }, [])
 
  // PDF Generator Function
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
      doc.setFontSize(12);
      const output: string[] = []
      res.forEach((error) => {
        if (error.message && error.timestamp){
          output.push(`${new Date(error.timestamp).toString()}: `)
          const cut = error.message.slice(68);
          const splitMessage = doc.splitTextToSize(cut, 190)
          splitMessage.forEach((split: string) => output.push(split))
        }
      })
      const pageHeight  = doc.internal.pageSize.getHeight()
      let y = 10;
      output.forEach(el => {
        doc.text(el, 10, y);
        y += 5;
        if (y > pageHeight) {
          doc.addPage();
          y = 10;
        }
      })

      doc.save(`${functionName}ErrorLogs.pdf`)
    })
  }

  // Render Component
  return (
    <>
      <div className='function' id={functionName}>
        <h2>&quot;{functionName}&quot;</h2>
        <Chart key={functionName} data={functionData} />
        <button className='error-button' onClick={() => generatePDF()}>Generate Error Logs</button>
      </div>
    </>
  );
}

export default Function;


