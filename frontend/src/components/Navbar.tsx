import React from 'react'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
export default function Navbar() {
    return (
        <div className="bg-gray-800 w-full relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center pl-10">
                <div className="flex space-x-6">
                    <div className="basis-1/12 bg-gray-800 py-2 sm:px-2 md:px-6 rounded-md text-center text-gray-300 hover:bg-gray-600 hover:text-gray-50">
                        <Link to="/">SJSU</Link>
                    </div>
                    <div className="basis-1/12 bg-gray-800 py-2 sm:px-2 md:px-6 rounded-md text-center text-gray-300 hover:bg-gray-600 hover:text-gray-50">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="basis-1/12 bg-gray-800 py-2 sm:px-2 md:px-6 rounded-md text-center text-gray-300 hover:bg-gray-600 hover:text-gray-50">
                        <Dropdown />
                    </div>
                    <div className="basis-1/12 bg-gray-800 py-2 sm:px-2 md:px-6 rounded-md text-center text-gray-300 hover:bg-gray-600 hover:text-gray-50">Messages</div>
                    <Link to="/profile">
                        <div className='bg-red-100 absolute w-10 h-10 rounded-full top-3 right-6'></div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
