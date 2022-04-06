import React from 'react'
import AssignmentCourseGrid from './AssignmentCourseGrid'
import { Link } from 'react-router-dom';

export default function Coursegrid({ data }: any) {
    return (
        <div className="bg-gray-600 container-sm h-64 w-128 my-4 mx-4 rounded-lg shadow-xl">
            <div className='flex border-b border-gray-800/50'>
                <div className="basis-2/3 mx-2 my-2 text-lg font-bold dark:text-slate-100 hover:text-slate-300">
                    <Link to="/courseRoute">{data.courseId}: {data.courseName}</Link>
                </div>
                <div className='basis-1/3 text-right px-4 py-3 text-slate-100 font-bold'>
                    {`0%`}
                </div>
            </div>
            {/* {data.assignments.map((data: any) => {
                return <AssignmentCourseGrid data={data} />
            })} */}
        </div>
    )
}