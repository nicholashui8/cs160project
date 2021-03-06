import Coursegrid from '../components/Coursegrid'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getCourses, getCoursesNotEnrolled, reset } from '../features/service/courseSlice'
import { CogIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify'

function Home() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const { user } = useSelector((state) => state.auth)
    const { courses, isLoading, isError, message } = useSelector((state) => state.courses)
    
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/')
        }

        dispatch(getCourses())
        dispatch(getCoursesNotEnrolled())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])
    
    if (isLoading) {
        return <Spinner />
    }
    
    return (
        <div className='flex flex-col h-screen overflow-hidden'>
            <Navbar />
            <div className='flex justify-center bg-gray-200 dark:bg-gray-700 h-screen overflow-scroll'>
                <div className="max-w-screen-2xl mt-9 grid grid-flow-row auto-rows-min xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                    {
                        user.userType === 'instructor' ?
                        (
                            <div className="bg-gray-300 dark:bg-gray-600 container-sm h-64 w-128 my-4 mx-4 grid grid-rows-2 divide-y divide-y-reverse rounded-lg shadow-xl">
                                <div className='mt-10 flex border-b border-gray-800/50 justify-center'>
                                    <div className="mx-2 my-2 text-2xl font-bold dark:text-slate-100 hover:text-slate-300">
                                        <Link className="text-slate-900 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300" to="/create-course">Create a new course</Link>
                                    </div>
                                    <div className="flex">
                                        <PlusCircleIcon className='h-10 w-10 stroke-2 stroke-black dark:stroke-slate-200'/>
                                    </div>
                                </div>
                                <div className='mt-10 flex border-b border-gray-800/50 justify-center'>
                                    <div className="mx-2 my-2 text-2xl font-bold dark:text-slate-100 hover:text-slate-300">
                                        <Link className="text-slate-900 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300" to="/delete-course">Delete a course</Link>
                                    </div>
                                    
                                    <div className="flex">
                                        <CogIcon className='h-10 w-10 stroke-2 stroke-black dark:stroke-slate-200'/>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-300 dark:bg-gray-600 container-sm h-64 w-128 my-4 mx-4 rounded-lg shadow-xl">
                                    <div className='flex border-b border-gray-800/50 justify-center'>
                                        <div className="mx-2 my-2 text-2xl font-bold dark:text-slate-100 hover:text-slate-300">
                                            <Link className="text-slate-900 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300" to="/courses/enroll-course">Manage courses</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-25 w-25 stroke-[0.5px] stroke-black dark:stroke-white" width="200px" height="200px" viewBox="0 0 20 20" fill="none">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            
                                        </div>
                                    </div>
                            </div>
                        )
                    }
                    {   
                        courses.map((course) => {
                            //console.log(course.course._id)
                            //console.log(course.assignments)
                            return <Coursegrid key={`home-coursegrid-${course.course._id}`} data={course} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Home

/*
(
                            <div className="bg-gray-300 dark:bg-gray-600 container-sm h-64 w-128 my-4 mx-4 grid grid-rows-2 divide-y divide-y-reverse rounded-lg shadow-xl">
                                <div className='mt-10 flex border-b border-gray-800/50 justify-center'>
                                    <div className="mx-2 my-2 text-2xl font-bold dark:text-slate-100 hover:text-slate-300">
                                        <Link className="text-slate-900 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300" to="/create-course">Create a new course</Link>
                                    </div>
                                    <div className="flex">
                                        <PlusCircleIcon className='h-10 w-10 stroke-2 stroke-slate-200'/>
                                    </div>
                                </div>
                                <div className='mt-10 flex border-b border-gray-800/50 justify-center'>
                                    <div className="mx-2 my-2 text-2xl font-bold dark:text-slate-100 hover:text-slate-300">
                                        <Link className="text-slate-900 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300" to="/delete-course">Delete a course</Link>
                                    </div>
                                    
                                    <div className="flex">
                                        <CogIcon className='h-10 w-10 stroke-2 stroke-slate-200'/>
                                    </div>
                                </div>
                            </div>
                        )
*/

/*
<div className="bg-gray-300 dark:bg-gray-600 container-sm h-64 w-128 my-4 mx-4 rounded-lg shadow-xl">
                                    <div className='flex border-b border-gray-800/50 justify-center'>
                                        <div className="mx-2 my-2 text-2xl font-bold dark:text-slate-100 hover:text-slate-300">
                                            <Link className="text-slate-900 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300" to="/create-course">Create a new course</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-25 w-25 stroke-[0.5px] stroke-black dark:stroke-white" width="200px" height="200px" viewBox="0 0 20 20" fill="none">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
*/