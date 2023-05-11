import React from "react"

export default function NavBar() {
    return (
      <nav className='p-0 ml-10 mb-0 flex justify-between'>
        {/* <h1 className="text-xl ml-2 flex items-center text-black font-bold">
            Jackie.ai
        </h1> */}
        <img className='flex items-center p-4 w-1/5 h-1/5 bg-transparent'
            src="/jackie.png"
            alt="Image"
          />
        <ul className = 'flex-auto justify-left flex ml-10 mt-14 flex-row'>
            <li className="text-med font-semibold text-gray-700 mr-8 hover:text-gray-900 cursor-pointer">Home</li>
            <li className="text-med font-semibold text-gray-700 mr-8 hover:text-gray-900 cursor-pointer">About</li>
            <li className="text-med font-semibold text-gray-700 mr-8 hover:text-gray-900 cursor-pointer">Contact</li>
            <li className="text-med font-semibold text-gray-700 mr-8 hover:text-gray-900 cursor-pointer">Login</li>
        </ul>
      </nav>
    )
  }
  