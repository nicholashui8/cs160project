import Navbar from "../components/Navbar"
import Spinner from "../components/Spinner"
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCourse, reset } from '../features/service/courseSlice'
import { toast } from 'react-toastify'

function Course(){

    const params = useParams()
    //const id = params.id
    
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
        <div>
            <Navbar />
            <div>
                <div className="mt-10 ml-10 text-4xl">
                    { 
                        `${singleCourse.course.courseId}: ${singleCourse.course.courseName}` 
                    }
                </div>
                <div className="">
                    {console.log(singleCourse)}
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