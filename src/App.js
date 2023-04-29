import logo from './logo.svg';
import './App.css';
import SearchBar from "./components/SearchBar.js"
import NavBar from "./components/Nav.js"
import SideBar from "./components/Sidebar.js"
import Chat from "./components/Chat.js"
import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import SearchResults from './components/SearchResults.js';

function App() {
  
  const [currentTime, setCurrentTime] = React.useState(0);
  const [count, setCount] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(true);
  
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

  return (
    <div className="App sticky top-0 z-50 bg-teal-600 border border-white flex-col h-screen">
      <div className = "flex items-center">
        <button
          className = "ml-auto absolute justify-center flex items-center w-10 h-10 bg-blue-500 rounded-full shadow-md cursor-pointer text-white font-bold text-xl"
          onClick={handleToggle}>
          {isOpen ?  
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 20 20">
            <path d="M2 5a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm16 5a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h14a1 1 0 0 1 1 1zm-8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg> : "X"}
          </button> 
          <img className='flex items-center ml-0 w-4 h-4 bg-transparent'
            src="./public/logo192.png"
            alt="Image"
          />
        <NavBar />
      </div>
      
  <div className="flex">
    <div className={`sidebar ${isOpen ? "w-1/3" : "w-1/3"}`}>
      <SideBar />
    </div>
    <div className="flex-1">
      <Chat />
    </div>
  </div>
</div>

  );
}

export default App;
