import Spinner from '../components/Spinner'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset} from '../features/service/authSlice'
import { LockClosedIcon } from '@heroicons/react/solid'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    const { email, password } = formData
    
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

        const userData = {
            email,
            password
        }

        console.log(userData)
        dispatch(login(userData))
    }
    
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="bg-gray-200 dark:bg-gray-700 h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h1 className="mt-3 text-center text-4xl font-extrabold text-cyan-500">Portal</h1>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800 dark:text-white">Sign into your account</h2>
                        <p className="mt-2 text-center text-lg text-indigo-600">
                            Or{' '}
                            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500"> create an account </a>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input  
                                    type="email" 
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                    id="email" 
                                    name="email"
                                    value={email}
                                    placeholder="Email address"
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
                                    placeholder="Password"
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login