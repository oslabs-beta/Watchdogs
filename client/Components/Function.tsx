// React Imports
import React, { useEffect } from 'react';
import Chart from './Chart';
import { jsPDF } from 'jspdf';
import Excel from 'exceljs';
import * as FileSaver from 'file-saver';

// Type Imports
import { FunctionProps, ErrorData, ErrorBodyType } from '../types';

// Main Function
function Function({ functionData, functionName, user, timeframe, period, unit }: FunctionProps) {

  // Change function border to red if there are errors
  useEffect(() => {
    if (Math.max(...functionData.Errors.values) > 0) {
      const errorFunc = document.getElementById(functionName);
      if (errorFunc) {
        errorFunc.className = 'function errorfunction';
      }
    }
  }, [functionData]);

  // PDF Generator
  const generatePDF = (): void => {
    fetch('/api/error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: user.region,
        arn: user.arn,
        func: functionName,
      } as ErrorBodyType),
    })
      .then((res): Promise<ErrorData[]> => res.json())
      .then((res) => {
        const doc = new jsPDF(); // Creates the PDF
        doc.setFontSize(12);
        const output: string[] = [];

        // For each error, push timestamp and error message to output array
        res.forEach((error) => {
          if (error.message && error.timestamp) {
            output.push(`${new Date(error.timestamp).toString()}: `);
            const cut = error.message.slice(68);
            const splitMessage = doc.splitTextToSize(cut, 190); // Splits error message to prevent text from running off page
            splitMessage.forEach((split: string) => output.push(split)); // Pushes each segment of split message to output array
          }
        });
        const pageHeight = doc.internal.pageSize.getHeight();
        let y = 10;

        // Creates as many pages as needed for the content of the document
        output.forEach((el) => {
          doc.text(el, 10, y);
          y += 5;
          if (y > pageHeight) {
            doc.addPage();
            y = 10;
          }
        });

        doc.save(`${functionName}ErrorLogs.pdf`); // Download document to local machine
      });
  };

  // Spreadsheet Generator
  const generateSpreadsheet = async (): Promise<void> => {
    fetch('/api/error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: user.region,
        arn: user.arn,
        func: functionName,
      } as ErrorBodyType),
    })
      .then((res): Promise<ErrorData[]> => res.json())
      .then((res) => {
        const workbook = new Excel.Workbook(); // Creates spreadsheet
        const worksheet = workbook.addWorksheet('My Sheet'); // Creates initial sheet
        const blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';// Formatting the spreadsheet

        // Create spreadsheet columns
        worksheet.columns = [
          { header: '#', key: 'id', width: 10 },
          { header: 'Log Stream Name', key: 'logStreamName', width: 32 },
          { header: 'Timestamp', key: 'timestamp', width: 15 },
          { header: 'Message', key: 'message', width: 64 },
          { header: 'Ingestion Time', key: 'ingestionTime', width: 15 },
          { header: 'Event ID', key: 'eventId', width: 32 },
        ];
        // Add a new row to spreadsheet for each error
        for (let i = 0; i < res.length; i++) {
          worksheet.addRow({
            id: `${i + 1}`,
            logStreamName: res[i].logStreamName,
            timestamp: new Date(res[i].timestamp!).toString(),
            message: res[i].message,
            ingestionTime: new Date(res[i].ingestionTime!).toString(),
            eventId: res[i].eventId,
          });
        }
        // Download spreadsheet to local machine
        workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data], { type: blobType });
          FileSaver.saveAs(blob, `${functionName}ErrorSpreadsheet`);
        });
      });
  };

  // Render Component
  return (
    <>
      <div className="function" id={functionName}>
        <div id='top-function'>
        <h2>&quot;{functionName}&quot;</h2>
        <div id='error-logs'>
        Export Error Logs: 
          <button className="error-button" onClick={() => generateSpreadsheet()}>
            Spreadsheet
          </button>
          <button className="error-button" onClick={() => generatePDF()}>
            PDF
          </button>
        </div>
        </div>
        <Chart key={functionName} functionName={functionName} data={functionData} timeframe={timeframe} period={period} unit={unit} />
      </div>
    </>
  );
}

export default Function;
