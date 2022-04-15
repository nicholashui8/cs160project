import {useState, useEffect} from 'react'
import { AcademicCapIcon } from '@heroicons/react/solid'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset} from '../features/service/authSlice'

function Register() {
    const [formData, setFormData] = useState({
       name: '',
       email: '',
       schoolId: '',
       isInstructor: '',
       password: '',
       password2: '' 
    })
    
    const { name, email, schoolId, isInstructor, password, password2 } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)  

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/home')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else if (isInstructor.toLowerCase() !== 'instructor' && isInstructor.toLowerCase() !== 'student') {
            toast.error('Enter either \'Instructor\' or \'Student\' as your occupation')
        } else {
            const userType = isInstructor.toLowerCase()

            const userData = {
                name,
                email,
                userType,
                schoolId,
                password
            }

            dispatch(register(userData))
        }
    }

    return (
        <>
            <div className="bg-gray-700 h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h1 className="mt-3 text-center text-4xl font-extrabold text-cyan-500">CS160 Project</h1>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Please create an account</h2>
                        <p className="mt-2 text-center text-lg text-indigo-600">
                            Or{' '}
                            <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500"> sign in to your account </a>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input  
                                    type="text" 
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                    id="name" 
                                    name="name"
                                    value={name}
                                    placeholder="Enter your name"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <input  
                                    type="email" 
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                    id="email" 
                                    name="email"
                                    value={email}
                                    placeholder="Enter your email address"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <input  
                                    type="password"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                    id='password'
                                    name='password'
                                    value={password}
                                    placeholder="Enter password"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <input  
                                    type="password"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                    id='password2'
                                    name='password2'
                                    value={password2}
                                    placeholder="Confirm password"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <input  
                                    type="text"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                    id='isInstructor'
                                    name='isInstructor'
                                    value={isInstructor}
                                    placeholder="Enter your occupation: 'Instructor' or 'Student'"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <input  
                                    type="text"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                    id='schoolId'
                                    name='schoolId'
                                    value={schoolId}
                                    placeholder="Enter your School ID"
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <AcademicCapIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
                                </span>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register 