import React from "react"

export default function NavBar(props) {
    return (
      <nav className='p-2 ml-2 flex items-center mb-0'>
        {/* <h1 className="text-xl ml-2 flex items-center text-black font-bold">
            Jackie.ai
        </h1> */}
        <button
          className = "flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full shadow-md cursor-pointer text-white font-bold text-xl"
          onClick={props.handleToggle}>
          {props.isOpen ?  
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 20 20">
            <path d="M2 5a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm16 5a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h14a1 1 0 0 1 1 1zm-8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg> : "X"}
        </button> 
        <h3 className="text-xl ml-2 flex items-center text-gray">Jackie.ai</h3>
        {/* <img className='flex items-center p-4 w-1/6 h-1/6 bg-transparent'
            src="/jackie.png"
            alt="Image"
          /> */}
        {/* <ul className = 'flex-auto justify-left flex ml-10 mr-2 mt-14 flex-row'>
            <li className="text-med font-semibold text-gray-700 mr-8 hover:text-gray-900 cursor-pointer">Home</li>
            <li className="text-med font-semibold text-gray-700 mr-8 hover:text-gray-900 cursor-pointer">About</li>
            <li className="text-med font-semibold text-gray-700 mr-8 hover:text-gray-900 cursor-pointer">Contact</li>
            <li className="text-med font-semibold text-gray-700 mr-8 hover:text-gray-900 cursor-pointer">Login</li>
        </ul> */}
      </nav>
    )
  }
  