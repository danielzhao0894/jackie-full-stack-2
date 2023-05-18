import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import insert_into_index from '../api/index_server.py';
import App from "../App";

function UploadBox(props) {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: props.handleAcceptedFiles});

  return (
    <div
      className={`${
        isDragActive
          ? "bg-blue-100 border-blue-500"
          : "bg-gray-100 border-gray-500"
      } col-span-2 m-4 border-4 border-dashed rounded-lg p-6 flex flex-col justify-center items-center`}
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


