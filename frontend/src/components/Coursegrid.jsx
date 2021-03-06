import AssignmentCourseGrid from './AssignmentCourseGrid'
import { Link } from 'react-router-dom'

export default function Coursegrid({ data }) {
    const courseId = data.course._id
    //console.log(data.grade)
    return (
        <div className="bg-gray-300 dark:bg-gray-600 container-sm h-64 w-128 my-4 mx-4 rounded-lg shadow-xl">
            <div className='flex border-b border-gray-800/50'>
                <div className="basis-2/3 mx-2 my-2 text-lg font-bold">
                    <Link className="text-slate-900 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300" to={`/course/${data.course._id}`}>{data.course.courseId} Sec {data.course.sectionId}: {data.course.courseName}</Link>
                </div>
                <div className='basis-1/3 text-right px-4 py-3 text-slate-800 dark:text-slate-200 font-bold'>
                    {data.grade ? `${data.grade}%` : 'N/A'}
                </div>
            </div>
            {   
                data.assignments.map((assignment) => {
                    //console.log(assignment)
                    const assignmentData = {assignment, courseId}
                    return <AssignmentCourseGrid key={`assignment-grid-${assignment._id}`} data={assignmentData} />
            })}
        </div>
    )
}