import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import AuthContext from '../auth/AuthProvider'
import useAuth from '../auth/useAuth'

export default function Login() {
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const { setAuth }: any = useAuth()
    let navigate = useNavigate();
    const onSignInClick = async (e: any) => {
        e.preventDefault()
        console.log(loginData)
        setAuth({ user: loginData.email, password: loginData.email })
        localStorage.setItem('persist', 'logged in')
        //return <Navigate to='/home' />
        // try {
        //     const response = await axios.post('/login',
        //         JSON.stringify({ loginData }),
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true
        //         }
        //     );
        //     setAuth({ user: loginData.email, password: loginData.email })
        //     console.log(JSON.stringify(response))
        // } catch (error) {
        //     console.log(error)
        // }
        console.log('Login success')
        navigate('/home')
    }
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form className="mt-8 space-y-6" onSubmit={onSignInClick}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                                value={loginData.email}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                value={loginData.password}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
