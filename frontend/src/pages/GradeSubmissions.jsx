import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSubmissionsForAssignment, gradeSubmissionForAssignment, reset } from '../features/service/submissionSlice'

function GradeSubmissions() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const params = useParams()

    const { user } = useSelector((state) => state.auth)
    const { submissions, isLoading, isError, isSuccessSubmissionGraded, message } = useSelector((state) => state.submissions)

    const [gradeValue, setGradeValue] = useState({})

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
        const assignmentId = params.assignmentId

        const data = { courseId, assignmentId }

        if (isSuccessSubmissionGraded) {
            toast.success('Submission was graded!!')
            navigate(`/course/${courseId}/assignments/${assignmentId}/grade-submissions`)
        }

        dispatch(getSubmissionsForAssignment(data))

        return () => {
            dispatch(reset())
        }
    }, [user, isError, isSuccessSubmissionGraded, message, dispatch, navigate, params.courseId, params.assignmentId])

    const onChange = (e) => {
        setGradeValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitGrade = (e) => {
        e.preventDefault()

        const grade = gradeValue[e.target.value]

        if (!grade) {
            toast.error('Please enter a value before submitting a grade')
        } else {
            
            const submissionData = {
                courseId: params.courseId,
                assignmentId: params.assignmentId,
                pointsRecieved: grade,
                userEmail: e.target.value
            }
            
            console.log(submissionData)
            dispatch(gradeSubmissionForAssignment(submissionData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return !submissions ? 
    (
        <div>
            <Navbar />
        </div>
    )
    :
    (
        <div className="flex h-screen flex-col overflow-hidden">
            <Navbar />
            <div className="h-screen overflow-scroll bg-gray-200 font-sans dark:bg-gray-700">
                
                <div className="mx-auto mt-6 w-11/12 bg-gray-700 p-3">
                <div className="mb-3 text-center text-3xl text-white">
                    <Link className="text-white" to={`/course/${params.courseId}/assignments/${params.assignmentId}`}>{`${submissions.assignment.assignmentName}`}</Link>
                </div>
                </div>

                <div className="mx-auto mt-2 w-11/12 rounded-lg bg-gray-900 p-6">
                <div className="text-center">
                    <div className="text-3xl text-white">
                    <span className="text-white">Submissions</span>
                    </div>
                </div>

                <div className="mt-8 w-full">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-zinc-700 text-lg uppercase leading-normal text-white">
                            <th className="w-1/3 py-3 px-4 text-left">Student</th>
                            <th className="w-2/12 py-3 text-center">File</th>
                            <th className="w-2/12 py-3 text-center">Score</th>
                            <th className="w-2/12 py-3 text-center">Out Of</th>
                            <th className="w-2/12 py-3 text-center">Status</th>
                            <th className="w-1/12 py-3 px-4 text-right">Selected</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 text-base font-light text-slate-300">
                            {
                                submissions.student_submissions.map(submission => {
                                    return (
                                        <tr key={`grade-submissions-row-${submission.submission.userEmail}`} className="border-b-2 border-gray-200 hover:bg-gray-300 hover:text-black">
                                            <td className="py-3 px-4 text-left">
                                                <span className="font-medium">{submission.studentName}</span>
                                            </td>

                                            <td className="float-center items-center py-3">
                                                <div className="flex justify-center">
                                                    <button type="button" onClick={() => { navigate(submission.submission.submissionFile[submission.submission.submissionFile.length - 1]) }} className="transform rounded-md bg-gray-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700 focus:bg-gray-600 focus:outline-none">View</button>
                                                </div>
                                            </td>

                                            <td className="py-3 text-center">
                                                <input
                                                    type='number'
                                                    name={submission.submission.userEmail}
                                                    placeholder = {!submission.submission.pointsRecieved ? 0 : submission.submission.pointsRecieved}
                                                    min = '0'
                                                    className='block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                                                    onChange={onChange}
                                                />
                                            </td>

                                            <td className="py-3 text-center">
                                                <span>{submissions.assignment.totalPointsPossible}</span>
                                            </td>

                                            <td className="py-3 text-center">
                                                <span>{!submission.submission.pointsRecieved ? 'Not Yet Graded' : 'Graded'}</span>
                                            </td>

                                            <td className="py-3 px-4 float-right items-right">
                                                <div className="flex justify-right">
                                                    <button type='button' value={submission.submission.userEmail} onClick={onSubmitGrade} className="px-4 py-2 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Grade</button>
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

export default GradeSubmissions

/*
<div className='flex flex-col h-screen overflow-hidden'>
  <div className='bg-gray-200 dark:bg-gray-700 h-screen font-sans overflow-scroll'>
                
                <div className='bg-gray-700 p-3 mx-auto mt-6 w-11/12'>
                  <div className='text-white text-3xl mb-5'>
                    <a className='text-white'>Assignment Name</a>
                  </div>
                </div>

                <div className='bg-gray-900 p-6 mx-auto mt-6 w-11/12 rounded-lg'>
                    <div className="sm:flex items-center justify-between">
                        <div className='text-white text-2xl'>
                          <a className='text-white'>Total Points: 10</a>
                        </div>
                        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                            <p className="text-lg font-bold text-white">Submit Grades</p>
                        </button>
                    </div>

                    <div className="w-full mt-8">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-zinc-700 text-white uppercase text-lg leading-normal">
                                    <th className="py-3 px-4 w-1/3 text-left">Student</th>
                                    <th className="py-3 w-2/12 text-center">Submission File</th>
                                    <th className="py-3 w-2/12 text-center">Score</th>
                                    <th className="py-3 w-2/12 text-center">Out Of</th>
                                    <th className="py-3 w-2/12 text-center">Status</th>
                                    <th className="py-3 w-1/12 px-4 text-right">Selected</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 text-slate-300 text-base font-light">
                              <tr className="border-b-2 border-gray-200 hover:bg-gray-100 hover:text-black">
                          
                                  <td className="py-3 px-4 text-left">
                                      <span className="font-medium">KIN169 Stress and Management</span>
                                  </td>
                                      
                                  <td className="py-3 text-center">
                                      <span>Professor</span>
                                  </td>
                              
                                  <td className="py-3 text-center">
                                      <span>M/T/W/TH/F</span>
                                  </td>
                                  
                                  <td className="py-3 text-center">
                                      <span>9:15PM - 10:30PM</span>
                                  </td>
                                  
                                  <td className="py-3 text-center">
                                      <span>online</span>
                                  </td>
                                      
                                  <td className="py-3 px-12 items-center">
                                          <input 
                                              type="checkbox" 
                                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                                  
                                          /> 
                                  </td>
                              </tr>
                            </tbody>                      
                        </table>
                    </div>
                </div>
  </div>
</div>
*/