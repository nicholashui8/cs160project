import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { removeCoursesFromUser, reset } from '../features/service/courseSlice'

function DropCourse() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { courses, isError,  isLoading, isSuccessRemovingCourses, message} = useSelector((state) => state.courses)

    const [coursesDrop, setCoursesDrop] = useState({})

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/')
        }

        if (!user.userType === 'student') {
            navigate('/home')
        }

        if (isSuccessRemovingCourses) {
            // toast.success('Dropping was a success')
            navigate('/home')
        }

        return () => {
            dispatch(reset())
        }
    }, [user, isError, isSuccessRemovingCourses, message, dispatch, navigate])

    const toggleHandler = (course) => () => {
        setCoursesDrop((state) => ({
            ...state,
            [course._id] : state[course._id] ? '' : course._id
        }))
    }

    const onClick = (e) => {
        e.preventDefault()
        //console.log(coursesDrop)

        const data = coursesDrop
        console.log('data', data)

        dispatch(removeCoursesFromUser(data))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='flex flex-col h-screen overflow-hidden'>
            <Navbar />
            <div className='flex justify-center bg-gray-200 dark:bg-gray-700 h-screen font-sans overflow-scroll'>
                <div className='bg-gray-900 p-6 mx-auto mt-20 w-5/6 rounded-lg'>
                    <div className="sm:flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800">
                                <Link className="py-2 px-8 text-white hover:text-indigo-700 hover:bg-indigo-100 rounded-full" to={'/courses/enroll-course'}>Add Course</Link>
                            </div>
                            <div className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8">
                                <div className="py-2 px-8 bg-zinc-700 text-white rounded-full">
                                    <p>My Page</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClick} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                            <p className="text-lg font-bold text-white">Save</p>
                        </button>
                    </div>

                    <div className="w-full mt-8">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-zinc-700 text-white uppercase text-lg leading-normal">
                                    <th className="py-3 px-4 w-1/3 text-left">Course Name</th>
                                    <th className="py-3 w-2/12 text-center">Instructor</th>
                                    <th className="py-3 w-2/12 text-center">Dates</th>
                                    <th className="py-3 w-2/12 text-center">Time</th>
                                    <th className="py-3 w-2/12 text-center">Location</th>
                                    <th className="py-3 w-1/12 px-4 text-right">Selected</th>
                                </tr>
                            </thead>
                            {
                                courses.map((course) => {
                                    return (
                                        <tbody key={`drop-course-row-${course.course._id}`} className="bg-gray-800 text-slate-300 text-base font-light">
                                            <tr className="border-b-2 border-gray-200 hover:bg-gray-100 hover:text-black">
                                        
                                                <td className="py-3 px-4 text-left">
                                                    <span className="font-medium">{`${course.course.courseId} ${course.course.courseName}: Sec ${course.course.sectionId}`}</span>
                                                </td>
                                                    
                                                <td className="py-3 text-center">
                                                    <span>{`${course.course.instructorName}`}</span>
                                                </td>
                                            
                                                <td className="py-3 text-center">
                                                    <span>{`${course.course.courseDates}`}</span>
                                                </td>
                                                
                                                <td className="py-3 text-center">
                                                    <span>{`${course.course.startTime} - ${course.course.endTime}`}</span>
                                                </td>
                                                
                                                <td className="py-3 text-center">
                                                    <span>{`${course.course.courseRoom}`}</span>
                                                </td>
                                                    
                                                <td className="py-3 px-12 items-center">
                                                        <input 
                                                            type="checkbox" 
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                                            value={coursesDrop[course.course._id]}
                                                            onChange={toggleHandler(course.course)}   
                                                        /> 
                                                </td>
                                            </tr>
                                        </tbody>    
                                    )
                                })
                            }                           
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DropCourse