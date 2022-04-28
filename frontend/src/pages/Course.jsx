import Navbar from "../components/Navbar"
import Spinner from "../components/Spinner"
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCourse, reset } from '../features/service/courseSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function Course(){

    const params = useParams()
    //const id = params.id
    console.log(params.id)

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
        console.log(singleCourse)
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
            <div className="h-screen overflow-scroll dark:text-slate-50 dark:bg-gray-600">
                <div className="mt-10 ml-10 text-4xl">
                    { 
                        `${singleCourse.course.courseId}: ${singleCourse.course.courseName}` 
                    }
                </div>
                <div className="">
                    {console.log(singleCourse)}
                </div>
                <div className="text-2xl ml-10 mt-20 font-semibold">
                    Course Information
                </div>
                <div className="grid grid-cols-1">
                    <div className="ml-10 mt-6">
                        {singleCourse.course.courseDescription}
                    </div>
                    <div className="ml-10 mt-6">
                        Class time: T/TH 12:00 - 13:15
                    </div>
                    <div className="ml-10 mt-6">
                        Location: Room 210
                    </div>
                    <div className="ml-10 mt-6">
                        Instructor: Yan Chen
                    </div>
                </div>
                
                <div className="text-3xl ml-10 mt-20 font-semibold">
                    Notifications
                </div>
                <div className="text-3xl ml-10 mt-20 font-semibold">
                    Assignments
                </div>
                <div className="grid grid-cols-4 mt-5 pl-10 pr-10 font-semibold">
                    <div className="col-span-2"> Assignment Name</div>
                    <div className=""> Due Date </div>
                    <div className=""> Submitted </div>
                </div>
                <div className="grid grid-cols-4 mt-5 pl-10 divide-y">
                    {
                        singleCourse.assignments.map((assignment) => {
                            return(
                                <>
                                <div className="col-span-2 hover:text-slate-600"><Link className="dark:text-slate-50" to="/assignment">{assignment.assignment.assignmentName}</Link></div>
                                <div className="">{assignment.assignment.dueDate}</div>
                                <div className="">No</div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="flex flex-row ml-10 mt-20">
                    <div className="text-3xl font-semibold flex-none">
                        Grades
                    </div>
                    <div className="grow w-14"></div>
                    <div className="text-2xl flex-none pt-2 ">
                        Total: 
                    </div>
                    <div className="text-2xl flex-none ml-2 mr-10 pt-2">
                        {singleCourse.grade}%
                    </div>
                </div>
                <div className="grid grid-cols-5 mt-5 pl-10 pr-10 font-semibold">
                    <div className="col-span-2"> Assignment Name</div>
                    <div className=""> Points Recieved</div>
                    <div className=""> Points Possible</div>
                    <div className=""> Grade</div>

                </div>
                <div className="grid grid-cols-5 divide-y-2 mt-5 pl-10 pr-10">
                    
                    {
                        singleCourse.assignments.map((assignment) => {
                            return(
                                <>
                                {/* to={`/course/${params.id}/assignments/${assignment.assignment.id}`} */}
                                <div className="col-span-2"><Link className="dark:text-slate-50" to={`/course/${params.id}/assignments/${assignment.assignment._id}`} >{assignment.assignment.assignmentName}</Link></div>
                                <div className="col-span-1">{assignment.submissionPoints}</div>
                                <div className="col-span-1">{assignment.assignment.totalPointsPossible}</div>
                                <div className="col-span-1">{assignment.assignmentGrade}%</div>
                                </>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}

export default Course