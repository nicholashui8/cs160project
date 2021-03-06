import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Dropdown from './Dropdown';
import { XIcon, MenuIcon } from '@heroicons/react/solid'
import { AcademicCapIcon, UserCircleIcon } from '@heroicons/react/outline'
import { logout, reset } from '../features/service/authSlice'
import Switcher from './Switcher';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// Finished
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
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-slate-200 hover:bg-gray-500 dark:hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6 fill-black dark:fill-slate-200 hover:bg-gray-500 dark:hover:bg-gray-700 hover:fill-white" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6 fill-black dark:fill-slate-200 hover:bg-gray-500 dark:hover:bg-gray-700 hover:fill-white" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <AcademicCapIcon className="block h-11 w-11 stroke-1 stroke-black dark:stroke-white" aria-hidden="true"/>
                                </div>
                                <div className="hidden sm:block sm:ml-8">
                                    <div className="flex space-x-4">
                                        <a href="/home" className="text-black dark:text-slate-200 hover:bg-gray-500 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Home</a>
                                        
                                        <div className="text-black dark:text-slate-200 hover:bg-gray-500 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                                            <Dropdown/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="hidden sm:block sm:ml-8">
                                    <Switcher/>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-400 dark:bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open user menu</span>
                                            <UserCircleIcon className="block h-11 w-11 stroke-2 stroke-black dark:stroke-white hover:white" aria-hidden="true"/>
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
                                    className= 'text-black dark:text-slate-200 hover:bg-gray-500 dark:hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                                >
                                    Home
                                </Disclosure.Button>
                        </div>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <div className="text-black dark:text-slate-200 hover:bg-gray-500 dark:hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                <Dropdown/>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar