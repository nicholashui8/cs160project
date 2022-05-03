import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createCourse, reset } from '../features/service/courseSlice'

function CreateCourse() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [courseId, setCourseId] = useState('')
  const [courseName, setCourseName] = useState('')
  const [sectionId, setSectionId] = useState('')
  const [courseRoom, setCourseRoom] = useState('')
  const [courseDates, setCourseDates] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [courseDescription, setCourseDescription] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isLoading, isSuccessCourseCreated, isError, message } = useSelector((state) => state.courses)

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

    if (isSuccessCourseCreated) {
      navigate('/home')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch, navigate])

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
      if (!courseId || !courseName || !sectionId || !courseRoom || !courseDates || !startTime || !endTime || !courseDescription) {
        setSelectedFile(null)
      }
      // Reformat start time to AM/PM
      const startH = +startTime.substring(0, 2)
      const newStartH = startH % 12 || 12
      const startAP = (startH < 12 || startH === 24) ? "AM" : "PM"
      const newStartTime = newStartH + startTime.substring(2) + startAP

      // Reformat end time to AM/PM
      const endH = +endTime.substring(0, 2)
      const newEndH = endH % 12 || 12
      const endAP = (endH < 12 || endH === 24) ? "AM" : "PM"
      const newEndTime = newEndH + endTime.substring(2) + endAP

      // create courseData for createCourse
      const courseData = new FormData()
      courseData.append('courseId', courseId)
      courseData.append('courseName', courseName)
      courseData.append('sectionId', sectionId)
      courseData.append('courseRoom', courseRoom)
      courseData.append('courseDates', courseDates)
      courseData.append('startTime', newStartTime)
      courseData.append('endTime', newEndTime)
      courseData.append('courseDescription', courseDescription)
      courseData.append('syllabus', selectedFile)
      
      dispatch(createCourse(courseData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <Navbar />
      <div className='flex justify-center bg-gray-200 dark:bg-gray-700 h-screen overflow-scroll'>
        <section className="max-w-screen-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
            <h1 className="text-3xl font-bold text-white text-center capitalize dark:text-white">Create new Course</h1>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-4">
                  <div>
                    <label className="text-white dark:text-gray-200" for="courseId">Course ID</label>
                    <input 
                      id="courseId" 
                      type="text"
                      name="courseId"
                      value={courseId}
                      placeholder="CS160"
                      onChange={(e) => setCourseId(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label className="text-white dark:text-gray-200" for="courseName">Course Name</label>
                    <input 
                      id="courseName" 
                      type="text" 
                      name="courseName"
                      value={courseName}
                      placeholder="Software Engineering"
                      onChange={(e) => setCourseName(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label className="text-white dark:text-gray-200" for="sectionId">Section ID</label>
                    <input 
                      id="sectionId" 
                      type="text" 
                      name="sectionId"
                      value={sectionId}
                      placeholder="9"
                      onChange={(e) => setSectionId(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                  </div>
                  <div>
                    <label className="text-white dark:text-gray-200" for="courseRoom">Course Room</label>
                    <input 
                      id="courseRoom" 
                      type="text" 
                      name="courseRoom"
                      value={courseRoom}
                      placeholder="MacQuarrie Hall 222"
                      onChange={(e) => setCourseRoom(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-3">
                  <div>
                    <label className="text-white dark:text-gray-200" for="courseDates">Select Course Days</label>
                    <select 
                      id="courseDates" 
                      name="courseDates"
                      value={courseDates}
                      onChange={(e) => setCourseDates(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    >
                      <option value="" disabled hidden>Choose course dates</option>
                      <option value="M">M</option>
                      <option value="M/W">M/W</option>
                      <option value="M/W/F">M/W/F</option>
                      <option value="T">T</option>
                      <option value="T/Th">T/Th</option>
                      <option value="T/Th/F">T/Th/F</option>
                      <option value="W">W</option>
                      <option value="Th">Th</option>
                      <option value="F">F</option>
                    </select>  
                  </div>
                  <div>
                    <label className="text-white dark:text-gray-200" for="startTime">Start Time</label>
                    <input 
                      id="startTime" 
                      type="time" 
                      name="startTime"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label className="text-white dark:text-gray-200" for="endTime">End Time</label>
                    <input 
                      id="endTime" 
                      type="time" 
                      name="endTime"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-1">
                  <div>
                    <label className="text-white dark:text-gray-200" for="courseDescription">Course Description</label>
                    <textarea 
                      id="courseDescription" 
                      type="textarea" 
                      name="courseDescription"
                      value={courseDescription}
                      placeholder="Enter a description of the course"
                      onChange={(e) => setCourseDescription(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                    </textarea>
                  </div>
                  <div>
                    <label className="text-white dark:text-gray-200" for="selectedFile">Syllabus</label>
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
                    <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Create Course</button>
                </div>
              </form>
        </section>
      </div>
    </div>
  )
}

export default CreateCourse