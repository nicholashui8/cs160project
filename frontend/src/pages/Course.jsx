import Navbar from "../components/Navbar"
import Spinner from "../components/Spinner"

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getCourse, reset } from '../features/service/courseSlice'
import { BadgeCheckIcon, MinusCircleIcon} from "@heroicons/react/outline"

function Course(){

    const params = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { singleCourse, isLoading, isError, message } = useSelector((state) => state.courses)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/')
        }

        const id = params.id

        dispatch(getCourse(id))
        return () => {
            dispatch(reset())
        }
    }, [user, isError, message, dispatch, navigate, params.id])

    if (isLoading) {
        return <Spinner />
    }

    return !singleCourse ? 
    (
        <div>
            <Navbar />
        </div> 
    )
    :
    (
        <div className='flex flex-col h-screen overflow-hidden'>
            <Navbar />
            <div className="h-screen overflow-scroll dark:text-white dark:bg-gray-700">

                <div className="mt-10 ml-16 text-4xl">
                    {
                        `${singleCourse.course.courseId} Sec ${singleCourse.course.sectionId}: ${singleCourse.course.courseName} `
                    }
                </div>
                
                <div className='bg-gray-900 p-5 mx-auto mt-10 w-11/12 rounded-lg'>
                    <div className='text-3xl font-bold'>
                        Course Information
                    </div>

                    <div className="grid grid-cols-1">
                        <div className='mt-6 text-2xl'>
                            {
                                `Instructor: ${singleCourse.course.instructorName}`
                            }
                        </div>
                        <div className="mt-6 text-xl">
                            { 
                                `Class Times: ${singleCourse.course.courseDates} from ${singleCourse.course.startTime} to ${singleCourse.course.endTime}`
                            }
                        </div>
                        <div className="mt-6 text-xl">
                            { 
                                `Location: ${singleCourse.course.courseRoom}`
                            }
                        </div>
                        <div className="mt-6 text-xl">
                            Course Description:
                        </div>
                        <div className="mt-2 text-md">
                            {
                                `${singleCourse.course.courseDescription}`
                            }
                        </div>
                    </div>
                </div>

                <div className='bg-gray-900 p-5 mx-auto mt-10 w-11/12 rounded-lg'>
                    <div className='text-3xl font-bold'>
                        Notifications
                    </div>
                </div>
                
                {/* Assignment */}
                <div className='bg-gray-900 p-5 mx-auto mt-10 w-11/12 rounded-lg'>
                    <div className='text-3xl font-bold'>
                        Assignments
                    </div>
                    <div className="mt-8">
                        <table className='w-full table-auto'>
                            <thead>
                                <tr className="text-white text-xl">
                                    <th className="w-1/2 text-left">Assignment Name</th>
                                    <th className="text-center">Due Date</th>
                                    <th className="text-right">Submitted</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300 text-base font-light">
                                {
                                    singleCourse.assignments.map((assignment) => {
                                        return (
                                            <tr key={`course-${singleCourse.course._id}-assignment-row-${assignment.assignment._id}`} className="border-b-2 border-gray-200">
                                                <td className="py-2 text-left text-lg">
                                                    <div className='flex items-center'>
                                                        <Link className="text-slate-300 font-['Courier_New'] tracking-tighter" to={`/course/${params.id}/assignments/${assignment.assignment._id}`}>{`${assignment.assignment.assignmentName}`}</Link>
                                                    </div>
                                                </td>
                                                <td className="py-2 text-center text-lg">
                                                    <span className="font-['Courier_New'] tracking-tighter font-bold">{`${assignment.assignment.dueDate}`}</span>
                                                </td>
                                                <td className='py-2 text-right items-center px-8 float-right'>
                                                    {
                                                        assignment.isSubmitted ? <BadgeCheckIcon className='h-8 w-8 stroke-2 stroke-[#90EE8F]'/> : <MinusCircleIcon className='h-8 w-8 strok-2 stroke-[#FF6248]'/>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div> 

                {/* Grades */}
                <div className='bg-gray-900 p-5 mx-auto mt-10 w-11/12 rounded-lg'>
                    <div className='flex flex-row'>
                        <div className='text-3xl font-bold'>
                            Grades
                        </div>
                        <div className='grow w-14'></div>
                        <div className='text-3xl flex-none'>
                            Total:
                        </div>
                        <div className='text-3xl flex-none ml-4'>
                            {
                                singleCourse.grade ? `${singleCourse.grade}%` : 'N/A' 
                            }
                        </div>
                    </div>
                    <div className="mt-8">
                        <table className='w-full table-auto'>
                            <thead>
                                <tr className="text-white text-xl">
                                    <th className="w-1/2 text-left">Assignment Name</th>
                                    <th className="w-1/5 text-center">Score</th>
                                    <th className="w-1/5 text-center">Out Of</th>
                                    <th className="text-right">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300 text-base font-light">
                                {
                                    singleCourse.assignments.map((assignment) => {
                                        return (
                                            <tr key={`course-${singleCourse.course._id}-assignment-grade-row-${assignment.assignment._id}`} className="border-b-2 border-gray-200">
                                                <td className="py-2 text-left text-lg">
                                                    <div className='flex items-center'>
                                                        <Link className="text-slate-300 font-['Courier_New'] tracking-tighter" to={`/course/${params.id}/assignments/${assignment.assignment._id}`}>{`${assignment.assignment.assignmentName}`}</Link>
                                                    </div>
                                                </td>
                                                <td className="py-2 text-center text-lg">
                                                    <span className="font-['Courier_New'] tracking-tighter font-bold">
                                                        {
                                                            assignment.isSubmitted && assignment.submissionPoints ? `${assignment.submissionPoints}` 
                                                            : assignment.isSubmitted && !assignment.submissionPoints ? '-'
                                                            : '-'
                                                        }
                                                    </span>
                                                </td>
                                                <td className="py-2 text-center text-lg">
                                                    <span className="font-['Courier_New'] tracking-tighter font-bold">{`${assignment.assignment.totalPointsPossible}`}</span>
                                                </td>
                                                <td className="py-2 text-right text-lg">
                                                    <span className="font-['Courier_New'] tracking-tighter font-bold">
                                                    {
                                                            assignment.isSubmitted && assignment.submissionPoints ? `${assignment.assignmentGrade}` 
                                                            : assignment.isSubmitted && !assignment.submissionPoints ? 'Not Graded'
                                                            : '--'
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className='bg-gray-900 p-5 mx-auto mt-10 w-11/12 rounded-lg'>
                    <div className='mb-8 text-3xl font-bold'>
                        Syllabus
                    </div>
                    
                    {<iframe src={`${singleCourse.course.syllabus}#view-fitH`} title="Syllabus" width="100%" height='750px'/>}

                </div>
            </div>
        </div>
    )
}

export default Course