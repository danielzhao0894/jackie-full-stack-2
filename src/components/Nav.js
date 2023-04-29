import React from "react"

export default function NavBar() {
    return (
      <nav className='p-0 ml-10 mb-0 flex justify-between'>
        {/* <h1 className="text-xl ml-2 flex items-center text-black font-bold">
            Jackie.ai
        </h1> */}
        <img className='flex items-center p-4 w-1/3 h-1/3 bg-transparent'
            src="/jackie.png"
            alt="Image"
          />
        <ul className="flex-1">
          <li><a href="#" className="text-md">
            </a>
        </li>
        </ul>
        <hr className="w-8/9 mx-auto my-auto border-gray-300" />
      </nav>
    )
  }
  