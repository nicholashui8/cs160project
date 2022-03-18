import React from 'react'
import { Link } from 'react-router-dom';

export default function AssignmentCourseGrid({ data }: any) {

    return (
        <div>
            <div className="flex my-3 ">
                <div className='basis-1/3 mx-2 text-slate-300 hover:text-slate-100'>
                    <Link to="/assignmentRoute"> {data.assignmentName}</Link>
                </div>
                <div className='basis-1/3'></div>
                <div className='basis-1/3 px-3 text-slate-300 text-right'>{data.dueDate}</div>
            </div>
        </div>
    )
}
