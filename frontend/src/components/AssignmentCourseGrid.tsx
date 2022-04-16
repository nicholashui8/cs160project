import React from 'react'
import { Link } from 'react-router-dom';

export default function AssignmentCourseGrid({ data }: any) {
    //console.log(data.assignmentName)
    return (
        <div>
            <div className="flex my-3 text-white dark:">
                <div className='basis-1/3 mx-2'>
                    <Link className="text-slate-900 dark:text-slate-300 hover:text-slate-600 dark:hover:text-slate-300" to="/assignmentRoute">{data.assignmentName}</Link>
                </div>
                <div className='basis-1/3'></div>
                <div className='basis-1/3 px-3 text-slate-800 dark:text-slate-200 text-right'>{data.dueDate}</div>
            </div>
        </div>
    )
}
