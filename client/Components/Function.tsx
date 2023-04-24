// React Imports
import React from 'react';
import Chart from './Chart';
import { jsPDF } from 'jspdf';
import Excel from 'exceljs'
import * as FileSaver from 'file-saver';
import { useState, useEffect } from 'react'

// Type Imports
import { FunctionProps, ErrorData , ErrorBodyType} from '../types';


// Main Function
function Function(props: FunctionProps) {
  // Destructure Props
  const { functionData, functionName, user, timeframe, period, unit } = props;

  //change function border to red if there are errors
  useEffect(() => {
    if (Math.max(...functionData.Errors.values) > 0) {
        const errorFunc = document.getElementById(functionName);
        if ( errorFunc){
          errorFunc.className = 'function errorfunction'
        }
    }
  })
 
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

  const generateSpreadsheet = async (): Promise<void> => {
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
          const workbook = new Excel.Workbook();
          const worksheet = workbook.addWorksheet("My Sheet");
          const blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

          worksheet.columns = [
            {header: '#', key: 'id', width: 10},
            {header: 'Log Stream Name', key: 'logStreamName', width: 32}, 
            {header: 'Timestamp', key: 'timestamp', width: 15,},
            {header: 'Message', key: 'message', width: 64},
            {header: 'Ingestion Time', key: 'ingestionTime', width: 15},
            {header: 'Event ID', key: 'eventId', width: 32}         
          ]
          for (let i = 0; i < res.length; i++){
            worksheet.addRow({id: `${i + 1}`, logStreamName: res[i].logStreamName, timestamp: new Date(res[i].timestamp!).toString(), message: res[i].message, ingestionTime: new Date(res[i].ingestionTime!).toString(), eventId: res[i].eventId})
          }
          // save under export.xlsx
          workbook.xlsx.writeBuffer().then(data => {
              const blob = new Blob([data], { type: blobType }); 
              FileSaver.saveAs(blob, `${functionName}ErrorSpreadsheet`);
              })        
        })
  }
  // Render Component
  return (
    <>
      <div className='function' id={functionName}>
        <h2>&quot;{functionName}&quot;</h2>
        <Chart key={functionName} data={functionData} timeframe={timeframe} period={period} unit={unit} />
        <div>
          <p>Generate Error Logs: </p>
          <button className='error-button' onClick={() => generatePDF()}>As PDF</button>
          <button className='error-button' onClick={() => generateSpreadsheet()} >As Spreadsheet</button>
        </div>
      </div>
    </>
  );
}

export default Function;


