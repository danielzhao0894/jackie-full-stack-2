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
  
  useEffect(() => {
    console.log("Effect ran")
    fetch('/time')
        .then(res => res.json())
        .then(data => {setCurrentTime(data.time);});
  }, [count]);

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
      }})
        .catch(error => {
          console.error('Error:', error);
        });
      }
    }, [acceptedFiles]);
    
    return (
      <div className="App">
        <NavBar isOpen={isOpen} handleToggle={handleToggle} />
        <div className="content flex border-0">
          <div className={`sidebar m-0 ${isOpen ? "w-1/2" : "w-1/5"} p-0 border-0 border-gray-200 rounded-lg transform`} style={{ zIndex: 50 }}>
            <SideBar />
            <UploadBox acceptedFiles={acceptedFiles} handleAcceptedFiles={handleAcceptedFiles} />
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
