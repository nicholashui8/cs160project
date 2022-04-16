import axios from 'axios'

/*  User API Calls */
const USER_API_URL = '/user-api/user'

// Register User
const register = async (userData) => {
    const response = await axios.post(USER_API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login User
const login = async (userData) => {
    const response = await axios.post(USER_API_URL + '/login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

/* Course API Calls */
const COURSE_API_URL = '/course-api/'

// Create a new course
const createCourse = async (courseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(COURSE_API_URL + '/course', courseData, config)
    return response.data
}

// Get user courses
const getCourses = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(COURSE_API_URL + 'user/courses', config)
    return response.data
}

/* Course ASSIGNMENT Calls */
const ASSIGNMENT_API_URL = '/assignment-api/'

// Get assignments from a course
const getAssignments = async (courseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    console.log('config ', config)

    const response = await axios.get(ASSIGNMENT_API_URL + 'course/assignments', courseData)
    return response.data
}

const apiServices = {
    register,
    login,
    logout,
    createCourse,
    getCourses,
    getAssignments
}

export default apiServices