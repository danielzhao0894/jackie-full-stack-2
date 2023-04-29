import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export default function SideBar() {

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
  ];

  return (
    <>
      <div 
        className="flex-1 h-full bg-gray-100 shadow-md transform transition-transform duration-300 ease-in-out" 
        style={{zIndex: 50}}
        >
        <div> 
          <ul className="px-4 py-8">
            <li className="mb-4 text-gray-600 hover:text-gray-900 cursor-pointer">Option 1</li>
            <li className="mb-4 text-gray-600 hover:text-gray-900 cursor-pointer">Option 2</li>
            <li className="mb-4 text-gray-600 hover:text-gray-900 cursor-pointer">Option 3</li>
            <li className="mb-4 text-gray-600 hover:text-gray-900 cursor-pointer">Option 4</li>
          </ul>
          <h2>Sidebar</h2>
          <Select
            className = "justify-center select-component w-1/2"
            options={options} />
        </div>
      </div>
    </>
  );
};



