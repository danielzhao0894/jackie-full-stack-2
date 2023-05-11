import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import insert_into_index from '../api/index_server.py';

function UploadBox(props) {

  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setAcceptedFiles(acceptedFiles);
    }, []);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]); // Assuming only one file is selected, you can modify it as per your requirements
  
      fetch('/uploadFile', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully!');
        } else {
          throw new Error('Error uploading file');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [acceptedFiles]);
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`${
        isDragActive
          ? "bg-blue-100 border-blue-500"
          : "bg-gray-100 border-gray-500"
      } col-span-2 border-4 border-dashed rounded-lg p-6 flex flex-col justify-center items-center`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500 text-xl font-bold">
          Drop the files here ...
        </p>
      ) : (
        <p className="text-gray-500 text-xl font-bold">
          Drag 'n' drop health insurance documents here (or click to select files)
        </p>
      )}
    </div>
  );
}

export default UploadBox;


