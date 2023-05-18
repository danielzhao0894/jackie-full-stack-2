import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import UploadBox from './Upload.js';
import { Document, Page } from 'react-pdf';

function PDFPreview({ pdfUrl }) {
  return (
    <div>
      <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}


export default function Preview(props) {

    const [documentData, setDocumentData] = useState(null);

    useEffect(() => {
        fetch('/getFilePath')
          .then(response => {
            if (response.ok) {
              return response.text();
            } else {
              throw new Error('Error retrieving document');
            }
          })
          .then(data => {
            setDocumentData(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, [props.acceptedFiles]);
    
      useEffect(() => {
        console.log("documentData: " + documentData)
        }, [documentData]);

      return (
    <div>
        {documentData ? (
            <div>
                <Document file={documentData}>
                <Page pageNumber={1} />
                </Document>
            </div>
            ) : (
            <p>Loading document...</p>
            )}
    </div>
      
      );
    
}
