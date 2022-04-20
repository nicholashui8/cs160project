import Navbar from "../components/Navbar"
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCourse, getCourses, reset } from '../features/service/courseSlice'
import { toast } from 'react-toastify'

function Course(){
    const [course, setCourse] = useState({})
    //get course id from route
    let { id } = useParams();
    
    console.log("id:" + id);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { courses, isLoading, isError, message } = useSelector((state) => state.courses)
    
    useEffect(() => {
        console.log("use effect called")
        if (isError) {
            console.log(message)
            toast.error(message)
        }

        if (!user) {
            navigate('/')
        }
        
        const courseData = { id }
        console.log(id)
        dispatch(getCourse(courseData))

        console.log(courses)
        return () => {
            dispatch(reset())
        }
    },  [])

    return (
        <div>
            <Navbar />
            <div>
                <div className="mt-10 ml-10 text-4xl">
                    {/* { `${courses.course.courseId}: ${courses.course.courseName}`} */}
                </div>
                <div className="">
                    {course.courseDescription}
                </div>
                <div className="text-3xl font-semibold">
                    Notifications
                </div>
                <div className="text-3xl font-semibold">
                    Assignments
                </div>
                <div className="text-3xl font-semibold">
                    Grades
                </div>


            </div>
        </div>
    )
}

export default Course