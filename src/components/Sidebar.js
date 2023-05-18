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

function CustomSelect({id, options, selectedOption, onChange}) {
  return(
    <Select 
      id={id}
      className="p-2 pt-0 select-component w-full" 
      options={options}
      value = {selectedOption}
      onChange={onChange}
       />  
  )
}
const [selectedOption, setSelectedOption] = React.useState(options1[0]); // pre-selects the second option
const [selectedOption3, setSelectedOption3] = React.useState(options3[0]); // pre-selects the second option

  // clean this code up 
  return (
<div className="flex-1 p-2" style={{zIndex: 50}}>
  <div className="grid grid-cols-2 gap-1 m-1"> 
    {/* <div className="col-span-2 px-4 py-8">
      <h2 className="mb-4 text-gray-600 hover:text-gray-900 cursor-pointer">Option 5</h2>
    </div> */}
    <div className="col-span-2 justify-center">
      <label htmlFor="select1" className="text-sm font-semibold text-gray-700 mb-1">Select language</label>
      <Select 
        id="select1" 
        className="p-2 pt-0 select-component w-full" 
        options={options1} 
        value = {selectedOption}
        onChange={setSelectedOption}
      />
    </div>
    {/* <div className="col-span-1">
      <label htmlFor="select2" className="text-sm font-semibold text-gray-700 mb-1">Select 2</label>
      <Select id="select2" className="p-2 pt-0 select-component w-full" options={options} />
    </div> */}
    <div className=" col-span-2 justify-center">
      <label htmlFor="select3" className="text-sm font-semibold text-gray-700 mb-1">Select use case</label>
      <Select 
        id="select3" 
        className=" p-2 pt-0 select-component w-full" 
        options={options3}
        value = {selectedOption3}
        onChange={setSelectedOption3}
        />
    </div>
    {/* <div className="col-span-1">
      <label htmlFor="select4" className="text-sm font-semibold text-gray-700 mb-1">Select 4</label>
      <Select id="select4" className=" p-2 pt-0 select-component w-full" options={options} />
    </div> */}
    {/* <div className="col-span-1">
      <label htmlFor="select5" className="text-sm font-semibold text-gray-700 mb-1">Select 5</label>
      <Select id="select5" className=" p-2 pt-0 select-component w-full" options={options} />
    </div> */}
  </div>
</div>

  );
};
