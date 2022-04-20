import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCourses, createCourse, reset } from '../features/service/courseSlice'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'

function CreateCourse() {

  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
    sectionId: '',
    courseDescription: '',
    createdByEmail: '',
    createdById: ''
  })

  const { courseId, courseName, sectionId, courseDescription, createdByEmail, createdById} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { courses, isLoading, isSuccessCourseCreated, isError, message } = useSelector((state) => state.courses)

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
    
    dispatch(getCourses())

    return () => {
      dispatch(reset())
    }
  }, [user, isError, isSuccessCourseCreated, message, dispatch, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const courseData = {
      courseId,
      courseName,
      sectionId,
      courseDescription,
      createdByEmail,
      createdById
    }

    dispatch(createCourse(courseData))
  }

  if (isLoading) {
    return <Spinner />
}

  return (
    <div>
      <Navbar />
      <div className='flex justify-center bg-gray-200 dark:bg-gray-700 h-screen overflow-scroll'>
        <section className="max-w-screen-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
            <h1 className="text-3xl font-bold text-white capitalize dark:text-white">Create new Course</h1>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-3">
                  <div>
                    <label className="text-white dark:text-gray-200" for="courseId">Course ID</label>
                    <input 
                      id="courseId" 
                      type="text"
                      name="courseId"
                      value={courseId}
                      placeholder="Ex) CS160"
                      onChange={onChange}
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
                      placeholder="Ex) Software Engineering"
                      onChange={onChange}
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
                      placeholder="Ex) 9"
                      onChange={onChange}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-2">
                  <div>
                    <label className="text-white dark:text-gray-200" for="createdByEmail">Confirm Email</label>
                    <input 
                      id="createdByEmail" 
                      type="email" 
                      name="createdByEmail"
                      value={createdByEmail}
                      placeholder="Enter your email"
                      onChange={onChange}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label className="text-white dark:text-gray-200" for="createdById">Confirm School ID</label>
                    <input 
                      id="createdById" 
                      type="text" 
                      name="createdById"
                      value={createdById}
                      placeholder="Enter your school id"
                      onChange={onChange}
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
                      onChange={onChange}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                    </textarea>
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


/*
<div className="grid grid-cols-1 gap-6 mt-7 sm:grid-cols-1">
                  <div>
                    <label className="text-white dark:text-gray-200" for="courseDescription">Course Description</label>
                    <textarea 
                      id="courseDescription" 
                      type="textarea" 
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                    </textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-white">Syllabus</label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span class="">Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" class="sr-only">
                          </label>
                          <p class="pl-1 text-white">or drag and drop</p>
                        </div>
                        <p class="text-xs text-white">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>  

*/