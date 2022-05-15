import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createAssignment, reset } from '../features/service/assignmentSlice'

function CreateAssignment() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [assignmentName, setAssignmentName] = useState('')
    const [points, setPoints] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [assignmentDescription, setAssignmentDescription] = useState('')

    const params = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { isLoading, isSuccessAssignmentCreated, isError, message } = useSelector((state) => state.assignments)

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

        if (isSuccessAssignmentCreated) {
            const id = params.courseId
            navigate(`/course/${id}`)
        }

        return () => {
            dispatch(reset())
        }
    }, [user, isSuccessAssignmentCreated, isError, message, dispatch, navigate, params.courseId])

    const handleFileUpload = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        if (!selectedFile) {
            toast.error('Please upload the syllabus file for the course')
        } else if (selectedFile.type !== 'application/pdf') {
            toast.error('Please upload only PDF files')
        } else {
            if (!assignmentName || !points || !dueDate || !assignmentDescription) {
                setSelectedFile(null)
            }

            const assignmentData = new FormData()
            assignmentData.append('assignmentName', assignmentName)
            assignmentData.append('points', points)
            assignmentData.append('dueDate', dueDate)
            assignmentData.append('assignmentDescription', assignmentDescription)
            assignmentData.append('assignmentFile', selectedFile)
            assignmentData.append('courseId', params.courseId)
            
            dispatch(createAssignment(assignmentData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='flex flex-col h-screen overflow-hidden'>
            <Navbar />
            <div className='flex justify-center bg-gray-200 dark:bg-gray-700 h-screen font-sans overflow-scroll'>

                <div className='bg-gray-900 p-6 mx-auto mt-10 w-5/6 rounded-lg'>
                    <div className="sm:flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800">
                                <div className="py-2 px-8 bg-zinc-700 text-white rounded-full">
                                    <p>Create Assignment</p>
                                </div>
                            </div>
                            <div className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8">
                                <Link className="py-2 px-8 text-white hover:text-indigo-700 hover:bg-indigo-100 rounded-full" to={`/course/${params.courseId}/assignments/delete`}>Delete Assignment</Link>
                            </div>
                        </div>
                        <Link className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded" to={`/course/${params.courseId}`}>
                            <p className="text-lg font-bold text-white">Back</p>
                        </Link>
                    </div>

                  <div className='bg-gray-800 p-6 mx-auto mt-10 w-full rounded-lg'>
                     <h1 className="mb-12 text-3xl font-bold text-white text-center capitalize dark:text-white">Create new Assignment</h1>
                     <form onSubmit={onSubmit} >
                      <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-3">
                        <div>
                          <label className="text-white dark:text-gray-200" for="assignmentName">Assignment Name</label>
                          <input 
                            id="assignmentName" 
                            type="text"
                            name="assignmentName"
                            placeholder='Project Proposal'
                            onChange={(e) => setAssignmentName(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-white dark:text-gray-200" for="points">Points Possible</label>
                          <input 
                            id="points" 
                            type="text" 
                            name="points"
                            placeholder="1"
                            onChange={(e) => setPoints(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-white dark:text-gray-200" for="dueDate">Due Date</label>
                          <input 
                            id="dueDate" 
                            type="date" 
                            name="dueDate"
                            onChange={(e) => setDueDate(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-1">
                        <div>
                          <label className="text-white dark:text-gray-200" for="assignmentDescription">Assignment Description</label>
                          <textarea 
                            id="assignmentDescription" 
                            type="textarea" 
                            name="assignmentDescription"
                            placeholder="Enter assignment description or instructions"
                            onChange={(e) => setAssignmentDescription(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                          </textarea>
                        </div>
                        <div>
                          <label className="text-white dark:text-gray-200" for="selectedFile">Assignment File</label>
                          <input 
                            className="block w-full px-4 py-2 text-base font-normal text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 bg-clip-padding border border-solid border-gray-300 dark:border-gray-600 rounded focus:text-gray-700 focus:bg-white focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none" 
                            type="file" 
                            id="selectedFile"
                            name="selectedFile"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>  
                  
                      <div className="flex justify-center mt-6">
                          <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Create Assignment</button>
                      </div>
                    </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateAssignment