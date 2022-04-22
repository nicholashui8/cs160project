import React from 'react'
import { Link } from 'react-router-dom';

export default function AssignmentCourseGrid({data}: any) {
    return (
        <div>
            <div className="flex my-3 text-white dark:">
                <div className='basis-1/3 mx-2'>
                    <Link className="text-slate-900 dark:text-slate-300 hover:text-slate-600 dark:hover:text-slate-300" to={`/course/${data.courseId}/assignments/${data.assignment._id}`}>{data.assignment.assignmentName}</Link>
                </div>
                <div className='basis-1/3'></div>
                <div className='basis-1/3 px-3 text-slate-800 dark:text-slate-200 text-right'>{data.assignment.dueDate}</div>
            </div>
        </div>
    )
}
