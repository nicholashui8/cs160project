import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function Dropdown() {
    let courses = ['Math', 'CS', 'English']
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="0 inline-flex justify-center text-slate-200">
                    Courses
                    <ChevronDownIcon className="mt-1 mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-100 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-100 scale-95"
            >
                <Menu.Items className=" origin-top-right absolute right-0  w-56 rounded-md shadow-lg bg-gray-500 ">
                    {
                        courses.map((course) => {
                            return (
                                <div className="opacity-100 rounded-md">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link to='courseRoute'>
                                                <div className='rounded-md hover:bg-gray-600 p-3 py-3'>
                                                    {course}
                                                </div>
                                            </Link>
                                        )
                                        }
                                    </Menu.Item>
                                </div>
                            )
                        })
                    }
                </Menu.Items>
            </Transition>
        </Menu >
    )
}
