import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import Coursegrid from '../components/Coursegrid'
import { getCourses, reset } from '../features/service/courseSlice'
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
        
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])
    
    return (
        <div>
            <Navbar />
            <div className='flex justify-center bg-gray-200 dark:bg-gray-700 h-screen'>
                <div className=" max-w-screen-2xl mt-9 grid grid-flow-row auto-rows-min xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                    {
                        user.userType === 'instructor' ?
                        (
                            <div className="bg-gray-600 container-sm h-64 w-128 my-4 mx-4 rounded-lg shadow-xl">
                                    <div className='flex border-b border-gray-800/50 justify-center'>
                                        <div className="mx-2 my-2 text-2xl font-bold dark:text-slate-100 hover:text-slate-300">
                                            <Link to="/create-course">Create a new course</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-25 w-25" width="200px" height="200px" viewBox="0 0 20 20" fill="white">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                            </div>
                        ) : ''
                    }
                    {   
                        courses.map((course) => {
                            console.log(courses)
                            return <Coursegrid data={course} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

let courseData = [
    {
        courseName: "Math",
        grade: 98.2,
        assignments: [
            {
                assignmentName: "Intro to",
                dueDate: "11/01/2021"
            },
            {
                assignmentName: "Addition",
                dueDate: "11/03/2021"
            },
        ]
    },
    {
        courseName: "English",
        grade: 89.3,
        assignments: [
            {
                assignmentName: "Intro to Grammar",
                dueDate: "11/04/2021"
            },
            {
                assignmentName: "Words",
                dueDate: "11/05/2021"
            },
        ]
    },
    {
        courseName: "CS",
        grade: 98.2,
        assignments: [
            {
                assignmentName: "Intro to addtion",
                dueDate: "11/01/2021"
            },
            {
                assignmentName: "Addition with big numbers",
                dueDate: "11/03/2021"
            },
        ]
    },

]

export default Home