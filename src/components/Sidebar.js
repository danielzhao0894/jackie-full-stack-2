import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import UploadBox from './Upload.js';

export default function SideBar() {

const options = [
  { value: 'option1', label: 'English' },
  { value: 'option2', label: 'Chinese (Mandarin)' },
  { value: 'option3', label: 'Spanish' }
  ];

const options1 = [
  { value: 'option1', label: 'English' },
  { value: 'option2', label: 'Chinese (Mandarin)' },
  { value: 'option3', label: 'Spanish' }
  ];

const options3 = [
  { value: 'option1', label: 'Generate appeal letter'},
  { value: 'option2', label: 'Ask Chatbot about health insurance' },
  { value: 'option3', label: 'Generate FAQ' }
  ];

const [selectedOption, setSelectedOption] = React.useState(options1[1]); // pre-selects the second option

  // clean this code up 
  return (
<div className="flex-1 p-4 h-full shadow-md transform" style={{zIndex: 50}}>
  <div className="grid grid-cols-2 gap-2 m-2"> 
    <div className="col-span-2 px-4 py-8">
      <h2 className="mb-4 text-gray-600 hover:text-gray-900 cursor-pointer">Option 5</h2>
    </div>
    <div className="col-span-1">
      <label htmlFor="select1" className="text-sm font-semibold text-gray-700 mb-1">Select language</label>
      <Select 
        id="select1" 
        className="p-2 pt-0 select-component w-full" 
        options={options1} 
        value = {selectedOption}
        onChange={setSelectedOption}
      />
    </div>
    <div className="col-span-1">
      <label htmlFor="select2" className="text-sm font-semibold text-gray-700 mb-1">Select 2</label>
      <Select id="select2" className="p-2 pt-0 select-component w-full" options={options} />
    </div>
    <div className=" col-span-2 justify-center">
      <label htmlFor="select3" className="text-sm font-semibold text-gray-700 mb-1">Select 3</label>
      <Select id="select3" className=" p-2 pt-0 select-component w-full" options={options3} />
    </div>
    <div className="col-span-2">
      <label htmlFor="uploadBox" className="text-sm font-semibold text-gray-700 mb-1">Upload Box</label>
      <UploadBox id="uploadBox" className=" p-2 pt-0 w-full" />
    </div>
    <div className="col-span-1">
      <label htmlFor="select4" className="text-sm font-semibold text-gray-700 mb-1">Select 4</label>
      <Select id="select4" className=" p-2 pt-0 select-component w-full" options={options} />
    </div>
    <div className="col-span-1">
      <label htmlFor="select5" className="text-sm font-semibold text-gray-700 mb-1">Select 5</label>
      <Select id="select5" className=" p-2 pt-0 select-component w-full" options={options} />
    </div>
    <div className="col-span-2">
      <button
        type="submit"
        className=" p-4 w-full rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors focus:outline-none focus:ring focus:border-blue-300">
        Submit
      </button>
    </div>
  </div>
</div>

  );
};
