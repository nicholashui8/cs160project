import Navbar from "../components/Navbar"
import Spinner from "../components/Spinner"

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAssignment, reset } from '../features/service/assignmentSlice'
import { createSubmission, updateSubmission } from '../features/service/submissionSlice'
import { BadgeCheckIcon, MinusCircleIcon} from "@heroicons/react/outline"

function Assignment() {
    const [selectedFile, setSelectedFile] = useState(null)

    const params = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { assignment, isLoading, isError, message } = useSelector((state) => state.assignments) 
    const { isSuccess, isSuccessSubmissionUpdate, isSubmissionLoading } = useSelector((state) => state.submissions)

    useEffect(() => {
        if (isError) {
          toast.error(message)
        }

        if (!user) {
          navigate('/')
        }

        const courseId = params.courseId
        const assignmentId = params.assignmentId
        
        if (isSuccess) {
          toast.success('Submission was successful!!!')
          navigate(`/course/${courseId}/assignments/${assignmentId}`)
        }

        if (isSuccessSubmissionUpdate) {
          toast.success('Submission was updated!!!')
          navigate(`/course/${courseId}/assignments/${assignmentId}`)
        }

        const data = { courseId, assignmentId }

        dispatch(getAssignment(data))

        return () => {
            dispatch(reset())
        }
    }, [user, isSuccess, isSuccessSubmissionUpdate, isError, message, dispatch, navigate, params.courseId, params.assignmentId])
    
    const handleFileUpload = (e) => {
      setSelectedFile(e.target.files[0])
    }

    const onCancelSubmission = (e) => {
      e.preventDefault()
      setSelectedFile(null)
    }

    const onSubmitAssignment = (e) => {
      e.preventDefault()

      if (!selectedFile) {
        toast.error('Please upload a file before submitting')
      } else if (selectedFile.type !== 'application/pdf') {
        toast.error('Please upload only PDF files')
      } else {
        const submissionData = new FormData()
        submissionData.append('assignmentId', params.assignmentId)
        submissionData.append('courseId', params.courseId)
        submissionData.append('submissionFile', selectedFile)

        dispatch(createSubmission(submissionData))
      }
    }
    
    const onResubmitAssignment = (e) => {
      e.preventDefault()

      if (!selectedFile) {
        toast.error('Please upload a file before submitting')
      } else if (selectedFile.type !== 'application/pdf') {
        toast.error('Please upload only PDF files')
      } else {
        const submissionData = new FormData()
        submissionData.append('assignmentId', params.assignmentId)
        submissionData.append('courseId', params.courseId)
        submissionData.append('submissionFile', selectedFile)

        dispatch(updateSubmission(submissionData))
      }
    }

    if (isLoading) {
        return <Spinner />
    }

    if (isSubmissionLoading) {
      return <Spinner />
    }

    return !assignment ? 
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
              <div className='bg-gray-700 p-3 mx-auto mt-7 w-11/12'>
                <div className='text-white text-xl mb-5'>
                  <Link className='text-white' to={`/course/${params.courseId}`}>{`${assignment.assignment.courseId} ${assignment.assignment.courseSection}: ${assignment.assignment.courseName}`}</Link>
                </div>
                <table className='w-full table-auto'>
                  <thead>
                    <tr className="text-white text-4xl border-b-2 border-b-gray-200">
                        <th className="py-2 w-2/3 text-left">{`${assignment.assignment.assignmentName}`}</th>
                        <th className="py-2 text-right float-right">
                          {
                            user.userType === 'instructor' ? 
                                <Link className="focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-2 bg-pink-700 hover:bg-pink-600 focus:outline-none rounded" to={`/course/${params.courseId}/assignments/${params.assignmentId}/grade-submissions`}>
                                    <p className="text-lg font-bold text-white">Grade Submissions</p>
                                </Link>

                            : assignment.isSubmitted ? <BadgeCheckIcon className='h-10 w-10 stroke-2 stroke-[#90EE8F]'/> : <MinusCircleIcon className='h-10 w-10 strok-2 stroke-[#FF6248]'/>
                          }
                        </th>
                    </tr>
                  </thead>
                </table>
              </div>
            
              <div className='bg-gray-900 p-5 mx-auto mt-6 w-11/12 rounded-lg'>
                <table className='w-full table-auto'>
                  <thead>
                    <tr className="text-white text-xl border-b-2 border-b-gray-200">
                        <th className="w-1/3 text-left font-['Courier_New'] tracking-tighter">{`Due: ${assignment.assignment.dueDate}`}</th>
                        <th className="w-1/4 text-center font-['Courier_New'] tracking-tighter">{`Points: ${assignment.assignment.totalPointsPossible}`}</th>
                        <th className="ext-center font-['Courier_New'] tracking-tighter">Submitting: a pdf file upload</th>
                    </tr>
                  </thead>
                </table>
                <div className='mt-8'>
                  <div className="text-lg font-['Courier_New'] tracking-tighter">
                    {assignment.assignment.assignmentDescription}
                  </div>
                </div>
              </div>

              <div className='bg-gray-900 p-5 mx-auto mt-10 w-11/12 rounded-lg'>
                <div className='mb-8 text-3xl font-bold'>
                    Assignment File
                </div>
                {<iframe src={`${assignment.assignment.assignmentFile}#view-fitH`} title="Syllabus" width="100%" height='750px'/>}
              </div>
              
              {
                user.userType !== 'instructor' ?
                  <div className='bg-gray-900 p-5 mx-auto mt-10 w-11/12 rounded-lg'>
                    <div className='text-3xl font-bold'>
                        File Upload
                    </div>

                    <div className='mt-7 text-md font-bold'>
                        Please upload a PDF file...
                    </div>

                    <div className='mt-10'>
                      <input 
                        className="block w-2/5 px-4 py-2 text-base font-normal text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 bg-clip-padding border border-solid border-gray-300 dark:border-gray-600 rounded focus:text-gray-700 focus:bg-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none" 
                        type="file"
                        id="selectedFile"
                        name="selectedFile"
                        onChange={handleFileUpload}
                      />
                    </div>

                    <div className='mt-5'>
                      <button onClick={onCancelSubmission} className="focus:ring-2 focus:ring-offset-2 focus:ring-zinc-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-2 bg-zinc-700 hover:bg-zinc-600 focus:outline-none rounded">
                        <p className="text-lg font-bold text-white">Cancel</p>
                      </button>

                      {
                        !assignment.isSubmitted ? 
                          (
                            <button onClick={onSubmitAssignment} className="ml-5 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                              <p className="text-lg font-bold text-white">Submit Assignment</p>
                            </button>
                          ) : (
                            <button onClick={onResubmitAssignment} className="ml-5 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                              <p className="text-lg font-bold text-white">Resubmit Assignment</p>
                            </button>
                          )
                      }
                      
                    </div>

                  </div>
                : ''
              }
          </div>
        </div>
    )
}

export default Assignment