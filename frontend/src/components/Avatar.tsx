import React, { useState } from 'react'
import { Popover } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'


export default function Avatar() {
    let navigate = useNavigate();
    const handleLogoutClick = (e: any) => {
        e.preventDefault()
        localStorage.removeItem("persist");
        navigate('/login')
    }
    return (
        <Popover className='relative'>
            <Popover.Button className="bg-blue-300 absolute w-10 h-10 rounded-full"></Popover.Button>
            <Popover.Panel className="bg-gray-800 w-48 h-40 absolute mt-12 z-4 -translate-x-32 rounded-2xl shadow-2xl">
                <div className="py-4 text-gray-300 text-center">
                    Nicholas Hui
                </div>
                <button className=" mx-2 h-10 text-gray-300 hover:bg-gray-600 rounded-xl text-center fixed inset-x-0 bottom-3" onClick={handleLogoutClick}>Logout</button>
            </Popover.Panel>
        </Popover >
    )
}
