import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteAssignment, getAssignments, reset } from '../features/service/assignmentSlice'

function DeleteAssignment() {
    const params = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { assignments, isSuccessDeleteAssignment, isLoading, isError, message } = useSelector((state) => state.assignments) 

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

        const courseId = params.courseId

        if (isSuccessDeleteAssignment) {
            toast.success('Assignement was deleted')
            navigate(`/course/${courseId}/assignments/delete`)
        }

        dispatch(getAssignments(courseId))

        return () => {
            dispatch(reset())
        }
    }, [user, isSuccessDeleteAssignment, isError, message, dispatch, navigate, params.courseId])

    if (isLoading) {
        return <Spinner />
    }

    const onDeleteClick = (e) => {
        e.preventDefault()

        const assignmentId = e.target.value
        const courseId = params.courseId

        const data = {courseId, assignmentId}

        dispatch(deleteAssignment(data))
    }

    return  !assignments ?
    (
        <div>
            <Navbar />
        </div>
    )
    :
    (
        <div className='flex flex-col h-screen overflow-hidden'>
            <Navbar />
            <div className='flex justify-center bg-gray-200 dark:bg-gray-700 h-screen font-sans overflow-scroll'>
                <div className='bg-gray-900 p-6 mx-auto mt-10 w-5/6 rounded-lg'>
                    <div className="sm:flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800">
                                <Link className="py-2 px-8 text-white hover:text-indigo-700 hover:bg-indigo-100 rounded-full" to={`/course/${params.courseId}/assignments/create`}>Create Assignment</Link>
                            </div>
                            <div className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8">
                                <div className="py-2 px-8 bg-zinc-700 text-white rounded-full">
                                    <p>Delete Assignment</p>
                                </div>
                            </div>
                        </div>
                        <Link className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded" to={`/course/${params.courseId}`}>
                            <p className="text-lg font-bold text-white">Back</p>
                        </Link>
                    </div>

                    <div className="w-full mt-8">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-zinc-700 text-white uppercase text-lg leading-normal">
                                    <th className="py-3 px-4 w-1/3 text-left">Assignment Name</th>
                                    <th className="py-3 w-2/12 text-center">Due Date</th>
                                    <th className="py-3 w-2/12 text-center">Points</th>
                                    <th className="py-3 w-2/12 text-center">File</th>
                                    <th className="py-3 w-1/12 px-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 text-slate-300 text-base font-light">
                                {console.log(assignments)}
                                {   
                                    assignments.map(assignment => {
                                        return (
                                            <tr className="border-b-2 border-gray-200 hover:bg-gray-100 hover:text-black">
                            
                                                <td className="py-3 px-4 text-left">
                                                    <span className="font-medium">{`${assignment.assignmentName}`}</span>
                                                </td>
                                                    
                                                <td className="py-3 text-center">
                                                    <span>{`${assignment.dueDate}`}</span>
                                                </td>
                                            
                                                <td className="py-3 text-center">
                                                    <span>{`${assignment.totalPointsPossible}`}</span>
                                                </td>
                                                
                                                <td className="py-3 float-center items-center">
                                                    <div className="flex justify-center">
                                                        <button type="submit" className="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">View</button>
                                                    </div>
                                                </td>
                                                
                                                <td className="py-3 px-4 float-right items-right">
                                                    <div className="flex justify-right">
                                                        <button type="submit" value={assignment._id} onClick={onDeleteClick} className="px-4 py-2 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>                              
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAssignment