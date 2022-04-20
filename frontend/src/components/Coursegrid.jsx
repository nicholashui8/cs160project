import AssignmentCourseGrid from './AssignmentCourseGrid'
import { Link } from 'react-router-dom'

export default function Coursegrid({ data }) {
    return (
        <div className="bg-gray-300 dark:bg-gray-600 container-sm h-64 w-128 my-4 mx-4 rounded-lg shadow-xl">
            <div className='flex border-b border-gray-800/50'>
                <div className="basis-2/3 mx-2 my-2 text-lg font-bold">
                    <Link className="text-slate-900 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300" to={"/course/" +data.course._id }>{data.course.courseId} Sec {data.course.sectionId}: {data.course.courseName}</Link>
                </div>
                <div className='basis-1/3 text-right px-4 py-3 text-slate-800 dark:text-slate-200 font-bold'>
                    {`0%`}
                </div>
            </div>
            {   
                data.assignments.map((assignment) => {
                    //console.log(assignment)
                    return <AssignmentCourseGrid data={assignment} />
            })}
        </div>
    )
}