import logo from './logo.svg';
import './App.css';
import SearchBar from "./components/SearchBar.js"
import NavBar from "./components/Nav.js"
import SideBar from "./components/Sidebar.js"
import Chat from "./components/Chat.js"
import ReactDOM from 'react-dom/client';
import React, { useState, useEffect, useCallback } from 'react';
import SearchResults from './components/SearchResults.js';
import UploadBox from './components/Upload';
import Preview from './components/Preview';
import { useDropzone } from "react-dropzone";

function App() {
  
  const [currentTime, setCurrentTime] = React.useState(0);
  const [count, setCount] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(true);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [indexOptions, setindexOptions] = useState({});
  
  /* // This just pre-uploads the file from the public folder
  useEffect(() => {
    const uploadFile = async (fileUrl) => {
      try {
        const response = await fetch(fileUrl);
        const fileBlob = await response.blob();
  
        const formData = new FormData();
        formData.append('file', fileBlob, 'Summary_of_benefits_and_coverage.pdf');
  
        const uploadResponse = await fetch('/uploadFile', {
          method: 'POST',
          body: formData
        });
  
        if (uploadResponse.ok) {
          console.log('File uploaded successfully!');
  
          const indicesResponse = await fetch('/getIndices');
          if (indicesResponse.ok) {
            const indicesData = await indicesResponse.json();
            setindexOptions(indicesData);
            console.log(indexOptions);
          } else {
            console.error('Failed to fetch indices.');
          }
        } else {
          console.error('File upload failed.');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // Pre-upload a file from the public folder
    const fileUrl = '../public/Summary_of_benefits_and_coverage.pdf';
    uploadFile(fileUrl);
  }, []); // Empty dependency array so it only runs once */
  
   // This is the actual file upload
   useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      const fileUrl = '../public/Summary_of_benefits_and_coverage.pdf';
  
      try {
        const response = await fetch(fileUrl);
        const fileBlob = await response.blob();
        formData.append("file", fileBlob, 'Summary_of_benefits_and_coverage.pdf');
      } catch (error) {
        console.error(error);
      }
  
      fetch('/uploadFile', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            console.log('File uploaded successfully!');
            return fetch('/getIndices');
          } else {
            throw new Error('Error uploading file');
          }
        })
        .then(indicesResponse => {
          if (indicesResponse.ok) {
            console.log('Indices fetched successfully!');
            return indicesResponse.json();
          } else {
            throw new Error('Error fetching indices');
          }
        })
        .then(indicesData => {
          setindexOptions(indicesData);
          console.log(indexOptions);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
  
    fetchData();
  }, []); // Empty dependency array so it only runs once
  

  // This is the actual file upload
 useEffect(() => {
  if (acceptedFiles.length > 0) {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    fetch('/uploadFile', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully!');
          return fetch('/getIndices'); // Fetch /getIndices after file upload
        } else {
          throw new Error('Error uploading file');
        }
      })
      .then(indicesResponse => {
        if (indicesResponse.ok) {
          console.log('Indices fetched successfully!');
          return indicesResponse.json(); // Resolve the JSON promise
        } else {
          throw new Error('Error fetching indices');
        }
      })
      .then(indicesData => {
        setindexOptions(indicesData);
        console.log(indexOptions);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}, [acceptedFiles]); // Only run when acceptedFiles changes

  

  function changeCount() {
    setCount(count + 1)
    }
    
  const handleToggle = () => {
    setIsOpen(!isOpen);
    };

  const handleAcceptedFiles = useCallback((acceptedFiles) => {
    console.log("handleAcceptedFiles ran")
    setAcceptedFiles(acceptedFiles);
    }, []);
  
  /* useEffect(() => {
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
      }})
        .catch(error => {
          console.error('Error:', error);
        });
      }
    }, [acceptedFiles]); */
    
    return (
      <div className="App">
        <NavBar isOpen={isOpen} handleToggle={handleToggle} />
        <div className="content flex border-0">
          <div className={`sidebar m-0 ${isOpen ? "w-1/2" : "w-1/5"} p-0 border-0 border-gray-200 rounded-lg transform`} style={{ zIndex: 50 }}>
            {/* {acceptedFiles.length > 0 && <Preview acceptedFiles={acceptedFiles[0]} />} */}
            {/* {indexOptions} */}
            <SideBar 
              indexOptions = {indexOptions} 
              />
            <UploadBox
              acceptedFiles={acceptedFiles} 
              handleAcceptedFiles={setAcceptedFiles} 
              />
            <div className="flex items-center justify-center">
              {/* Submit button */}
            </div>
          </div>
          <div className="flex-initial mb-8 overflow-auto">
            <Chat acceptedFiles={acceptedFiles} />
          </div>
        </div>
      </div>
    );
    
    
    
}

export default App;
