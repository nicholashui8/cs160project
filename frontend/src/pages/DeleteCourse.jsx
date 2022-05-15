import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteCourse, reset } from '../features/service/courseSlice'

function DeleteCourse() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { courses, isSuccessDeleteCourse, isError, isLoading, message} = useSelector((state) => state.courses)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/')
        }

        if (user.userType !== 'instructor') {
            navigate('/home')
        }

        if (isSuccessDeleteCourse) {
            navigate('/home')
        }

        return () => {
            dispatch(reset())
        }
    }, [user, isSuccessDeleteCourse, isError, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }
    
    const onDeleteClick = (e) => {
        e.preventDefault()
        
        const courseId = e.target.value

        dispatch(deleteCourse(courseId))
    }

    return (
        <div className = 'flex flex-col h-screen overflow-hidden'>
            <Navbar />
            <div className='flex justify-center bg-gray-200 dark:bg-gray-700 h-screen overflow-scroll'>
                <section className="w-5/6 p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-900 mt-20">  
                <h1 className="text-3xl font-bold text-white text-center capitalize dark:text-white">Delete Course</h1>
                <div className="w-full mt-8">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-zinc-700 text-white uppercase text-lg leading-normal">
                            <th className="py-3 px-4 w-1/3 text-left">Course Name</th>
                            <th className="py-3 w-1/12 text-">Dates</th>
                            <th className="py-3 w-2/12 text-center">Time</th>
                            <th className="py-3 w-2/12 text-center">Location</th>
                            <th className="py-3 w-2/12 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 text-slate-300 text-base font-light"> 
                            {
                                courses.map((course) => {
                                    return (
                                        <tr key={`delete-course-row-${course.course._id}`} className="border-b-2 border-gray-200 hover:bg-gray-100 hover:text-black">

                                            <td className="py-3 px-4 text-left">
                                                <span className="font-medium">{`${course.course.courseId} ${course.course.courseName}: Sec ${course.course.sectionId}`}</span>
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
                                                
                                            <td className="py-3 px-4 float-right items-right">
                                                <div className="flex justify-right">
                                                    <button type="submit" value={course.course._id} onClick={onDeleteClick} className="px-10 py-2 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Delete</button>
                                                </div>
                                            </td>
                                        </tr> 
                                    )
                                })
                            }
                        </tbody>  
                    </table>
                </div>
                </section>
            </div>
        </div>
    )
}

export default DeleteCourse