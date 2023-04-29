import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function UploadBox(props) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

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


