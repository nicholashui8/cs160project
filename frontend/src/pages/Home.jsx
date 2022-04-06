import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import Coursegrid from '../components/Coursegrid'
import { getCourses, reset } from '../features/service/courseSlice'

function Home() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const { user } = useSelector((state) => state.auth)
    const { courses, isLoading, isError, message } = useSelector((state) => state.courses)
    
    
    useEffect(() => {
        if (isError) {
            console.log(message)
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
            <div className='flex justify-center bg-gray-700 h-screen'>
                <div className=" max-w-screen-2xl mt-9 grid grid-flow-row auto-rows-min xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
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
//exmaple data
