import Navbar from "../components/Navbar"
import Spinner from "../components/Spinner"
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAssignment, reset } from '../features/service/assignmentSlice'
import { toast } from 'react-toastify'

function Assignment() {
    const params = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { assignment, isLoading, isError, message } = useSelector((state) => state.assignments) 
    
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/')
        }

        const courseId = params.courseId
        const assignmentId = params.assignmentId
        const data = { courseId, assignmentId }

        dispatch(getAssignment(data))

        return () => {
            dispatch(reset())
        }
    }, [user, isError, message, dispatch, navigate, params.courseId, params.assignmentId])
    
    if (isLoading) {
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
        <div>
            <Navbar />
            <div>
                <div className="mt-10 ml-10 text-4xl">
                    { 
                        `${assignment.assignmentName}: ${assignment.dueDate}` 
                    }
                </div>
                <div className="">
                    {console.log(assignment)}
                </div>
            </div>
        </div>
    )
}

export default Assignment