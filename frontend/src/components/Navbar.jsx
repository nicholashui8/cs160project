import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Dropdown from './Dropdown';
import { XIcon, MenuIcon } from '@heroicons/react/solid'
import { logout, reset } from '../features/service/authSlice'
import Switcher from './Switcher';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }


    return (
        <Disclosure as="nav" className='bg-gray-400 dark:bg-gray-800'>
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-11" fill="none" viewBox="0 0 24 24" stroke="White" strokeWidth={1}>
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                    </svg>
                                </div>
                                <div className="hidden sm:block sm:ml-8">
                                    <div className="flex space-x-4">
                                        <a href="/home" className="text-gray-300 hover:bg-gray-500 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Home</a>
                                        
                                        <div className="text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                                            <Dropdown/>
                                        </div>

                                        <a href="/messages" className="text-gray-300 hover:bg-gray-500 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Messages</a>
                                    </div>
                                </div>
                            </div>
                            <div>
                               <Switcher/>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open user menu</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-11" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-500  ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) =>
                                                    <a
                                                        href="/profile"
                                                        className={classNames(active ? 'bg-gray-200 dark:bg-gray-600' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200')}
                                                    >
                                                        Your Profile
                                                    </a>
                                                }
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) =>
                                                    <a
                                                        href='/'
                                                        className={classNames(active ? 'bg-gray-200 dark:bg-gray-600' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200')}
                                                        onClick={onLogout}
                                                    >
                                                        Sign out
                                                    </a>
                                                }
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                                <Disclosure.Button
                                    key={"Home"}
                                    as="a"
                                    href={"/home"}
                                    className= 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                                >
                                    Home
                                </Disclosure.Button>
                        </div>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                                <Dropdown/>
                        </div>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                                <Disclosure.Button
                                    key={"Messages"}
                                    as="a"
                                    href={"/messages"}
                                    className= 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                                >
                                    Messages
                                </Disclosure.Button>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar

/*
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
*/
